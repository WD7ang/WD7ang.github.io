#!/usr/bin/env python3
"""Refresh public profile metrics without replacing a last-known-good value.

Requires Python 3.10+ and the standard library only. Google Scholar is requested
once normally; CAPTCHA, rate limits, and unexpected pages are never bypassed.
Without --publish this only writes the selected local output file.
"""

from __future__ import annotations

import argparse
import base64
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, quote, urlencode, urlparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
USER_AGENT = "homepage-profile-stats/1.0 (+https://wd7ang.github.io/)"
MAX_RESPONSE_BYTES = 5 * 1024 * 1024
GITHUB_SCOPE = "owned-and-research"
REPOSITORY_NAME = re.compile(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+")


def warning(message: str) -> None:
    print(f"Warning: {message}", file=sys.stderr)


def fetch(url: str, *, method: str = "GET", payload=None, token=None):
    headers = {"User-Agent": USER_AGENT, "Cache-Control": "no-cache"}
    if urlparse(url).hostname == "api.github.com":
        headers.update({
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        })
        if token:
            headers["Authorization"] = f"Bearer {token}"
    data = None
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"
    request = Request(url, headers=headers, data=data, method=method)
    with urlopen(request, timeout=30) as response:
        body = response.read(MAX_RESPONSE_BYTES + 1)
        if len(body) > MAX_RESPONSE_BYTES:
            raise ValueError("Response exceeded the size limit")
        return body.decode("utf-8"), response.url


def fetch_json(url: str, **kwargs):
    body, _ = fetch(url, **kwargs)
    return json.loads(body)


def valid_count(value) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and value >= 0


def valid_github_snapshot(incoming: dict, user: str, additional_repositories: list[str]) -> bool:
    """Accept only a complete, consistent snapshot for the configured scope."""
    if (incoming.get("github_scope") != GITHUB_SCOPE
            or str(incoming.get("github_user", "")).lower() != user.lower()
            or not valid_count(incoming.get("github_stars"))):
        return False
    repositories = incoming.get("github_repositories")
    if not isinstance(repositories, list):
        return False
    names = set()
    research_names = set()
    total = 0
    for repository in repositories:
        if not isinstance(repository, dict):
            return False
        name = repository.get("name")
        if not isinstance(name, str) or not REPOSITORY_NAME.fullmatch(name):
            return False
        key = name.lower()
        if key in names or not valid_count(repository.get("stars")):
            return False
        names.add(key)
        kind = "owned" if name.split("/", 1)[0].lower() == user.lower() else "research"
        if repository.get("kind") != kind:
            return False
        if kind == "research":
            research_names.add(key)
        total += repository["stars"]
    expected_research = {name.lower() for name in additional_repositories
                         if name.split("/", 1)[0].lower() != user.lower()}
    return research_names == expected_research and total == incoming["github_stars"]


def merge_metrics(base: dict, incoming, profile_id: str, github_user="WD7ang",
                  additional_repositories=None) -> dict:
    """Keep valid fields; never replace project totals with an owner-only cache."""
    if not isinstance(incoming, dict):
        return base
    result = dict(base)
    if valid_github_snapshot(incoming, github_user, additional_repositories or []):
        result.update({
            "github_stars": incoming["github_stars"],
            "github_user": github_user,
            "github_scope": GITHUB_SCOPE,
            "github_repositories": [{
                "name": repository["name"], "stars": repository["stars"],
                "url": "https://github.com/" + repository["name"],
                "kind": repository["kind"],
            } for repository in incoming["github_repositories"]],
        })
        checked = incoming.get("github_checked_on")
        result["github_checked_on"] = checked if isinstance(checked, str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", checked) else None
    if (incoming.get("scholar_profile_id", profile_id) == profile_id
            and valid_count(incoming.get("scholar_citations"))):
        result["scholar_citations"] = incoming["scholar_citations"]
        checked = incoming.get("scholar_checked_on")
        if isinstance(checked, str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", checked):
            result["scholar_checked_on"] = checked
    return result


class ScholarStatsParser(HTMLParser):
    """Read the labelled Citations / All cell, not arbitrary page numbers."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_stats = False
        self.in_row = False
        self.in_cell = False
        self.rows: list[list[str]] = []
        self.row: list[str] = []
        self.cell: list[str] = []
        self.has_profile_name = False

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if attributes.get("id") == "gsc_prf_in":
            self.has_profile_name = True
        if tag == "table" and attributes.get("id") == "gsc_rsb_st":
            self.in_stats = True
        elif self.in_stats and tag == "tr":
            self.in_row = True
            self.row = []
        elif self.in_stats and self.in_row and tag in ("td", "th"):
            self.in_cell = True
            self.cell = []

    def handle_data(self, data):
        if self.in_cell:
            self.cell.append(data)

    def handle_endtag(self, tag):
        if self.in_cell and tag in ("td", "th"):
            self.row.append(" ".join("".join(self.cell).split()))
            self.in_cell = False
        elif self.in_stats and tag == "tr":
            self.rows.append(self.row)
            self.in_row = False
        elif self.in_stats and tag == "table":
            self.in_stats = False


def parse_scholar_citations(html: str, final_url: str, profile_id: str) -> int:
    parsed_url = urlparse(final_url)
    if (
        parsed_url.hostname != "scholar.google.com"
        or parsed_url.path != "/citations"
        or parse_qs(parsed_url.query).get("user") != [profile_id]
    ):
        raise ValueError("Google Scholar did not return the requested profile")
    lower = html.lower()
    if any(message in lower for message in (
        "please show you're not a robot", "unusual traffic", "g-recaptcha", "recaptcha/api",
    )):
        raise ValueError("Google Scholar requested human verification")
    parser = ScholarStatsParser()
    parser.feed(html)
    if not parser.has_profile_name:
        raise ValueError("Google Scholar profile identity markup is missing")
    # Validate the column heading too: the second cell must mean all-time, not
    # the trailing 'Since YYYY' count or an h-index value.
    if not any(len(row) >= 2 and row[1].lower() == "all" for row in parser.rows):
        raise ValueError("Google Scholar all-time statistics heading is missing")
    for row in parser.rows:
        if len(row) >= 2 and row[0].lower() == "citations":
            value = row[1].replace(",", "").replace(" ", "").replace("\xa0", "")
            if re.fullmatch(r"\d+", value):
                return int(value)
    raise ValueError("Google Scholar Citations / All value was not found")


def load_projects_config(path: Path, user_override: str | None = None):
    config = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(config, dict):
        raise ValueError("GitHub projects configuration must be an object")
    user = user_override or config.get("user")
    if not isinstance(user, str) or not re.fullmatch(r"[A-Za-z0-9-]+", user):
        raise ValueError("Invalid GitHub user in projects configuration")
    additional = config.get("additional_repositories")
    if not isinstance(additional, list):
        raise ValueError("Additional repositories must be a list")
    unique = {}
    for name in additional:
        if not isinstance(name, str) or not REPOSITORY_NAME.fullmatch(name):
            raise ValueError("Additional repository must be owner/name")
        unique.setdefault(name.lower(), name)
    return user, list(unique.values())


def github_metrics(user: str, additional_repositories: list[str], token: str | None) -> dict:
    """Fetch every configured repository before publishing any new total."""
    repositories = {}
    seen_ids = set()

    def add_repository(repo):
        if not isinstance(repo, dict):
            raise ValueError("GitHub repository response was invalid")
        name, stars = repo.get("full_name"), repo.get("stargazers_count")
        if not isinstance(name, str) or not REPOSITORY_NAME.fullmatch(name) or not valid_count(stars):
            raise ValueError("GitHub repository metadata was invalid")
        if repo.get("private"):
            raise ValueError("Only public repositories can be counted")
        repository_id = repo.get("id")
        if name.lower() in repositories or (valid_count(repository_id) and repository_id in seen_ids):
            return
        if valid_count(repository_id):
            seen_ids.add(repository_id)
        repositories[name.lower()] = {
            "name": name, "stars": stars, "url": "https://github.com/" + name,
            "kind": "owned" if name.split("/", 1)[0].lower() == user.lower() else "research",
        }

    for page in range(1, 101):
        query = urlencode({"type": "owner", "per_page": 100, "page": page})
        repos = fetch_json(f"https://api.github.com/users/{quote(user)}/repos?{query}", token=token)
        if not isinstance(repos, list):
            raise ValueError("GitHub repository list was invalid")
        for repo in repos:
            if not isinstance(repo, dict):
                raise ValueError("GitHub repository metadata was invalid")
            owner = repo.get("owner")
            if not isinstance(owner, dict) or not isinstance(owner.get("login"), str):
                raise ValueError("GitHub repository owner was invalid")
            if owner["login"].lower() != user.lower():
                continue
            add_repository(repo)
        if len(repos) < 100:
            break
    else:
        raise ValueError("GitHub repository pagination exceeded the limit; preserving previous total")
    for name in additional_repositories:
        if name.lower() not in repositories:
            repo = fetch_json(f"https://api.github.com/repos/{quote(name, safe='/')}", token=token)
            add_repository(repo)
    details = sorted(repositories.values(), key=lambda repository: repository["name"].lower())
    metrics = {
        "github_stars": sum(repository["stars"] for repository in details),
        "github_user": user, "github_scope": GITHUB_SCOPE, "github_repositories": details,
    }
    if not valid_github_snapshot(metrics, user, additional_repositories):
        raise ValueError("GitHub returned an incomplete repository scope; preserving previous total")
    return metrics


class MetricsPublisher:
    def __init__(self, repository: str, branch: str, token: str):
        if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repository):
            raise ValueError("Repository must be owner/name")
        if branch in ("master", "main"):
            raise ValueError("Metrics publication must use a dedicated branch")
        self.api = f"https://api.github.com/repos/{repository}"
        self.branch = branch
        self.token = token
        self.content = None
        self.previous = None

    def request(self, endpoint: str, **kwargs):
        return fetch_json(self.api + endpoint, token=self.token, **kwargs)

    def read_existing(self):
        try:
            self.content = self.request(f"/contents/profile-stats.json?ref={quote(self.branch, safe='')}")
        except HTTPError as error:
            if error.code != 404:
                raise
            return None
        self.previous = json.loads(base64.b64decode(self.content["content"]).decode("utf-8"))
        if not isinstance(self.previous, dict):
            raise ValueError("Existing published metrics are not a JSON object")
        return self.previous

    def ensure_branch(self):
        endpoint = f"/git/ref/heads/{quote(self.branch, safe='')}"
        try:
            self.request(endpoint)
            return
        except HTTPError as error:
            if error.code != 404:
                raise
        repository = self.request("")
        default_branch = repository["default_branch"]
        if default_branch == self.branch:
            raise ValueError("Refusing to publish metrics on the default branch")
        source = self.request(f"/git/ref/heads/{quote(default_branch, safe='')}")
        try:
            self.request("/git/refs", method="POST", payload={
                "ref": f"refs/heads/{self.branch}", "sha": source["object"]["sha"],
            })
        except HTTPError as error:
            if error.code != 422:
                raise
            # Another runner may have created the branch. Verify it exists;
            # never reset, delete, or force-push a branch.
            self.request(endpoint)

    def publish(self, metrics: dict):
        if self.previous == metrics:
            print("Metrics unchanged; no commit needed.")
            return
        # Check even existing branches against the current default branch.
        if self.request("")["default_branch"] == self.branch:
            raise ValueError("Refusing to publish metrics on the default branch")
        self.ensure_branch()
        body = json.dumps(metrics, indent=2, ensure_ascii=False) + "\n"
        payload = {
            "message": "Update public profile metrics",
            "content": base64.b64encode(body.encode("utf-8")).decode("ascii"),
            "branch": self.branch,
        }
        if self.content:
            payload["sha"] = self.content["sha"]
        self.request("/contents/profile-stats.json", method="PUT", payload=payload)
        print(f"Published profile-stats.json to {self.branch}.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--github-user", help="Override the user from the projects configuration")
    parser.add_argument("--projects-config", type=Path, default=ROOT / "_data/github_projects.json")
    parser.add_argument("--scholar-id", default="NH9USaYAAAAJ")
    parser.add_argument("--snapshot", type=Path, default=ROOT / "_data/profile_stats.json")
    parser.add_argument("--previous-url")
    parser.add_argument("--output", type=Path, default=Path("profile-stats.json"))
    parser.add_argument("--publish", action="store_true")
    parser.add_argument("--repository", default=os.environ.get("GITHUB_REPOSITORY", "WD7ang/wd7ang.github.io"))
    parser.add_argument("--branch", default="profile-metrics")
    args = parser.parse_args()
    if not re.fullmatch(r"[A-Za-z0-9_-]+", args.scholar_id):
        parser.error("Invalid Google Scholar profile id")
    github_user, additional_repositories = load_projects_config(args.projects_config, args.github_user)
    token = os.environ.get("GITHUB_TOKEN")
    if args.publish and not token:
        parser.error("--publish requires GITHUB_TOKEN in the environment")
    metrics = {
        "github_stars": None, "github_checked_on": None,
        "github_user": github_user, "github_scope": GITHUB_SCOPE, "github_repositories": [],
        "scholar_citations": None, "scholar_checked_on": None,
        "scholar_profile_id": args.scholar_id,
    }
    if args.snapshot.is_file():
        metrics = merge_metrics(metrics, json.loads(args.snapshot.read_text(encoding="utf-8")), args.scholar_id,
                                github_user, additional_repositories)
    if args.previous_url:
        try:
            metrics = merge_metrics(metrics, fetch_json(args.previous_url), args.scholar_id,
                                    github_user, additional_repositories)
        except (HTTPError, URLError, TimeoutError, ValueError) as error:
            warning(f"Previous public metrics unavailable ({type(error).__name__}); using fallback.")
    publisher = None
    if args.publish:
        publisher = MetricsPublisher(args.repository, args.branch, token)
        # Authenticated Contents API avoids a stale/missing raw CDN response
        # overwriting a more recent good citation count.
        metrics = merge_metrics(metrics, publisher.read_existing(), args.scholar_id,
                                github_user, additional_repositories)
    today = datetime.now(timezone.utc).date().isoformat()
    try:
        metrics.update(github_metrics(github_user, additional_repositories, token))
        metrics["github_checked_on"] = today
        print(f"GitHub project stars: {metrics['github_stars']} across {len(metrics['github_repositories'])} repositories")
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        warning(f"GitHub fetch failed ({type(error).__name__}); keeping the last good value.")
    scholar_url = "https://scholar.google.com/citations?" + urlencode({"user": args.scholar_id, "hl": "en"})
    try:
        html, final_url = fetch(scholar_url)
        citations = parse_scholar_citations(html, final_url, args.scholar_id)
        metrics["scholar_citations"] = citations
        metrics["scholar_checked_on"] = today
        print(f"Google Scholar citations: {citations}")
    except (HTTPError, URLError, TimeoutError, ValueError) as error:
        warning(f"Google Scholar fetch unavailable ({type(error).__name__}); keeping the last good value and date.")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(metrics, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    if publisher:
        publisher.publish(metrics)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (HTTPError, URLError, TimeoutError, ValueError, KeyError, OSError) as error:
        # Do not print request headers, tokens, or HTTP bodies.
        print(f"Profile metrics update failed: {type(error).__name__}", file=sys.stderr)
        raise SystemExit(1)
