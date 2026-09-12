"""Interaction checks for the ordered materials and Sandpaper Letters."""

import os

from playwright.sync_api import expect, sync_playwright


BASE_URL = os.environ.get("APP_URL", "http://127.0.0.1:8001/")
CHROMIUM = os.environ.get("CHROMIUM_PATH", "/snap/bin/chromium")


def open_activity(page, material):
    page.goto(BASE_URL, wait_until="networkidle")
    page.locator(f".material-card.{material}").click()
    page.get_by_role("button", name="Begin the activity").click()


def complete_sequence(page, material, noun, completion):
    open_activity(page, material)
    for size in range(10, 0, -1):
        page.get_by_role("button", name=f"Select {noun} {size}").click()
        page.get_by_role("button", name=f"Place {noun} {size}").click()
    expect(page.locator(".completion-note")).to_contain_text(completion)
    page.get_by_role("button", name="3D").click()
    expect(page.locator(".activity-stage canvas")).to_be_visible()
    page.wait_for_timeout(500)
    page.screenshot(path=f"/tmp/montessori-{material}-3d.png", full_page=True)
    page.get_by_role("button", name=f"Return {noun} 5", exact=True).click()
    expect(page.get_by_text("9 of 10", exact=False)).to_be_visible()


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
    page = browser.new_page(viewport={"width": 1280, "height": 960})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))

    complete_sequence(page, "red-rods", "rod", "steady progression")
    complete_sequence(page, "broad-stair", "prism", "broad stair")
    complete_sequence(page, "number-rods", "rod", "ordered progression")

    open_activity(page, "sandpaper-letters")
    for letter in ["m", "a", "s"]:
        page.get_by_role("button", name=f"Choose letter {letter}").click()
        page.get_by_role(
            "button", name=f"Complete {letter} with keyboard"
        ).click()
    expect(page.get_by_text("explored all three letter forms", exact=False)).to_be_visible()
    page.get_by_role("button", name="3D").click()
    expect(page.locator(".activity-stage canvas")).to_be_visible()
    page.wait_for_timeout(700)
    page.screenshot(path="/tmp/montessori-new-activities.png", full_page=True)
    page.get_by_role("button", name="2D").click()
    page.get_by_role("button", name="Start again").click()
    pad = page.locator(".letter-trace-pad")
    bounds = pad.bounding_box()
    assert bounds
    page.mouse.move(bounds["x"] + 35, bounds["y"] + 35)
    page.mouse.down()
    page.mouse.move(
        bounds["x"] + bounds["width"] - 35,
        bounds["y"] + bounds["height"] - 35,
        steps=24,
    )
    page.mouse.up()
    expect(page.get_by_role("button", name="m explored", exact=True)).to_be_disabled()

    assert not errors, errors
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
    browser.close()

print("New activity checks passed")
