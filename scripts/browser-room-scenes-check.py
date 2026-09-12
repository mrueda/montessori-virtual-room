"""Room scene smoke checks. Run while the app is served on port 8001."""

import os

from playwright.sync_api import expect, sync_playwright


BASE_URL = os.environ.get("APP_URL", "http://127.0.0.1:8001/")
CHROMIUM = os.environ.get("CHROMIUM_PATH", "/snap/bin/chromium")
LAUNCH_ARGS = [
    "--no-sandbox",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
]


def verify_scene(page, screenshot):
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(BASE_URL, wait_until="networkidle")
    expect(page.get_by_text("THE CHILDREN’S HOUSE", exact=True)).to_be_visible()
    expect(page.locator(".room-canvas canvas")).to_be_visible()
    page.wait_for_timeout(800)
    page.screenshot(
        path="/tmp/montessori-childrens-house-overview.png", full_page=True
    )
    scene_nav = page.get_by_label("Classroom views")
    expect(
        scene_nav.get_by_role("button", name="Practical Life", exact=True)
    ).to_be_visible()
    scene_nav.get_by_role("button", name="Practical Life", exact=True).click()
    expect(page.get_by_text("THE PRACTICAL LIFE CORNER", exact=True)).to_be_visible()
    expect(
        page.get_by_text("Everyday movements, prepared with care", exact=True)
    ).to_be_visible()
    expect(page.locator(".room-canvas canvas")).to_be_visible()
    page.wait_for_timeout(1200)
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
    page.screenshot(path=screenshot, full_page=True)
    scene_nav.get_by_role("button", name="Sensorial", exact=True).click()
    expect(page.get_by_text("THE SENSORIAL CORNER", exact=True)).to_be_visible()
    expect(
        page.get_by_text(
            "Dimensions, color, and form invite close observation", exact=True
        )
    ).to_be_visible()
    expect(page.locator(".room-canvas canvas")).to_be_visible()
    page.wait_for_timeout(1000)
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
    page.screenshot(
        path=screenshot.replace("practical-life", "sensorial"), full_page=True
    )
    scene_nav.get_by_role("button", name="Language", exact=True).click()
    expect(page.get_by_text("THE LANGUAGE CORNER", exact=True)).to_be_visible()
    expect(page.locator(".room-canvas canvas")).to_be_visible()
    page.wait_for_timeout(800)
    page.screenshot(
        path=screenshot.replace("practical-life", "language"), full_page=True
    )
    scene_nav.get_by_role("button", name="Mathematics", exact=True).click()
    expect(page.get_by_text("THE MATHEMATICS CORNER", exact=True)).to_be_visible()
    expect(page.locator(".room-canvas canvas")).to_be_visible()
    page.wait_for_timeout(800)
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
    page.screenshot(
        path=screenshot.replace("practical-life", "mathematics"), full_page=True
    )
    for label, heading, slug in [
        ("Culture", "THE CULTURE CORNER", "culture"),
        ("Art", "THE ART STUDIO", "art"),
        ("Courtesy", "GRACE AND COURTESY", "courtesy"),
    ]:
        scene_nav.get_by_role("button", name=label, exact=True).click()
        expect(page.get_by_text(heading, exact=True)).to_be_visible()
        expect(page.locator(".room-canvas canvas")).to_be_visible()
        page.wait_for_timeout(800)
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
        page.screenshot(path=screenshot.replace("practical-life", slug), full_page=True)
    assert not errors, errors


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path=CHROMIUM,
        headless=True,
        args=LAUNCH_ARGS,
    )

    desktop = browser.new_page(viewport={"width": 1440, "height": 1000})
    verify_scene(desktop, "/tmp/montessori-practical-life-desktop.png")

    tablet = browser.new_page(
        viewport={"width": 768, "height": 1024},
        has_touch=True,
        is_mobile=True,
        device_scale_factor=1,
    )
    verify_scene(tablet, "/tmp/montessori-practical-life-tablet.png")
    tablet.locator("#age-group").select_option("18m-3y")
    expect(tablet.get_by_text("THE TODDLER COMMUNITY", exact=True)).to_be_visible()
    expect(
        tablet.get_by_label("Classroom views").get_by_role(
            "button", name="Practical Life", exact=True
        )
    ).to_have_count(0)
    expect(tablet.locator(".room-canvas canvas")).to_be_visible()
    tablet.wait_for_timeout(800)
    tablet.screenshot(path="/tmp/montessori-toddler-regression.png", full_page=True)

    browser.close()

print("Room scene checks passed")
