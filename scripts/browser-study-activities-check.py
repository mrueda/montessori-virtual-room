"""Complete every data-driven study and verify its shared 2D/3D lifecycle."""

import os

from playwright.sync_api import expect, sync_playwright


BASE_URL = os.environ.get("APP_URL", "http://127.0.0.1:8001/")
CHROMIUM = os.environ.get("CHROMIUM_PATH", "/snap/bin/chromium")

STUDIES = {
    "continent-globe": [
        ("brown continent", "Africa"),
        ("red continent", "Europe"),
        ("yellow continent", "Asia"),
        ("green continents", "The Americas"),
        ("violet continent", "Oceania"),
        ("white continent", "Antarctica"),
    ],
    "world-puzzle-map": [
        ("North America", "northwest place"),
        ("South America", "southwest place"),
        ("Europe", "small northern place"),
        ("Africa", "central place"),
        ("Asia", "large eastern place"),
        ("Australia", "southeast place"),
    ],
    "land-water-forms": [
        ("land surrounded by water", "island"),
        ("water surrounded by land", "lake"),
        ("land reaching into water", "peninsula"),
        ("water reaching into land", "gulf"),
        ("narrow land connection", "isthmus"),
        ("narrow water connection", "strait"),
    ],
    "botany-cabinet": [
        ("heart-shaped leaf", "cordate outline"),
        ("oval leaf", "ovate outline"),
        ("narrow leaf", "lanceolate outline"),
        ("hand-shaped leaf", "palmate outline"),
    ],
    "animal-classification": [
        ("horse", "mammal"),
        ("robin", "bird"),
        ("salmon", "fish"),
        ("frog", "amphibian"),
        ("butterfly", "insect"),
    ],
    "life-cycle-sequencing": [
        ("egg", "first stage"),
        ("caterpillar", "second stage"),
        ("chrysalis", "third stage"),
        ("butterfly", "fourth stage"),
    ],
    "color-mixing": [
        ("red + yellow", "orange"),
        ("yellow + blue", "green"),
        ("blue + red", "violet"),
    ],
    "line-design": [
        ("horizontal line", "beginning"),
        ("rising line", "rise"),
        ("vertical line", "center"),
        ("falling line", "fall"),
        ("closing line", "ending"),
    ],
    "greeting-practice": [
        ("approach calmly", "notice and approach"),
        ("pause with space", "leave comfortable space"),
        ("offer a greeting", "greet"),
        ("listen for a response", "listen"),
    ],
    "table-setting": [
        ("plate", "center"),
        ("fork", "left of the plate"),
        ("spoon", "right of the plate"),
        ("glass", "above the plate"),
        ("napkin", "beside the setting"),
    ],
    "walking-around-mat": [
        ("notice the work", "notice"),
        ("slow down", "slow"),
        ("leave space and walk around", "make space"),
        ("continue on your path", "continue"),
    ],
}


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path=CHROMIUM,
        headless=True,
        args=[
            "--no-sandbox",
            "--use-gl=angle",
            "--use-angle=swiftshader",
            "--enable-unsafe-swiftshader",
        ],
    )
    page = browser.new_page(viewport={"width": 1280, "height": 1000})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(BASE_URL, wait_until="networkidle")

    for study_id, placements in STUDIES.items():
        page.locator(f".material-card.{study_id}").click()
        page.get_by_role("button", name="Begin the activity").click()
        remaining = placements
        if study_id == "continent-globe":
            page.get_by_role("button", name="brown continent", exact=True).click()
            page.get_by_role(
                "button", name="Place selected piece at Europe"
            ).click()
            page.get_by_role(
                "button", name="Europe contains brown continent; return it to the tray"
            ).click()
            page.get_by_role(
                "button", name="Place selected piece at Africa"
            ).click()
            remaining = placements[1:]
        for piece, target in remaining:
            page.get_by_role("button", name=piece, exact=True).click()
            page.get_by_role(
                "button", name=f"Place selected piece at {target}"
            ).click()
        expect(page.locator(".completion-note")).not_to_have_text(
            "Take your time. This space is yours."
        )
        if study_id in {
            "continent-globe",
            "world-puzzle-map",
            "life-cycle-sequencing",
            "color-mixing",
            "table-setting",
            "walking-around-mat",
        }:
            page.screenshot(
                path=f"/tmp/montessori-{study_id}-2d.png", full_page=True
            )
        if study_id == "color-mixing":
            page.get_by_role("button", name="3D", exact=True).click()
            expect(page.locator(".activity-stage canvas")).to_be_visible()
            expect(page.locator(".study-controls.compact")).to_be_visible()
            page.screenshot(path="/tmp/montessori-color-mixing-3d.png", full_page=True)
            page.get_by_role("button", name="Guidance", exact=True).click()
            page.get_by_role("button", name="Watch a demonstration").click()
            expect(page.get_by_role("dialog")).to_be_visible()
            page.get_by_role("button", name="Close demonstration").click()
        page.get_by_role("button", name="Back to the classroom").click()

    assert not errors, errors
    page.screenshot(path="/tmp/montessori-22-activities.png", full_page=True)
    browser.close()

print("All 11 data-driven study activities passed")
