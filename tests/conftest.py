"""Fixture: server statis untuk folder repo dan halaman browser baru per test (progres selalu kosong)."""
import functools
import http.server
import pathlib
import threading

import pytest
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]


class _Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


@pytest.fixture(scope="session")
def base_url():
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(_Quiet, directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{srv.server_address[1]}/"
    srv.shutdown()


@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        b = p.chromium.launch()
        yield b
        b.close()


def _open(browser, base_url, **ctx):
    context = browser.new_context(**ctx)
    # font Google tidak dibutuhkan untuk test
    context.route("**/fonts.googleapis.com/**", lambda r: r.abort())
    context.route("**/fonts.gstatic.com/**", lambda r: r.abort())
    page = context.new_page()
    page.js_errors = []
    page.on("pageerror", lambda e: page.js_errors.append(str(e)))
    page.on("dialog", lambda d: d.accept())  # konfirmasi (keluar kuis, reset) dijawab "OK"
    page.goto(base_url)
    page.wait_for_selector("#sila-panel h3")
    return context, page


@pytest.fixture
def page(browser, base_url):
    context, pg = _open(browser, base_url, viewport={"width": 1280, "height": 900})
    yield pg
    errors = pg.js_errors
    context.close()
    assert not errors, f"Error JavaScript: {errors}"


@pytest.fixture
def mobile(browser, base_url):
    context, pg = _open(browser, base_url, viewport={"width": 390, "height": 844})
    yield pg
    errors = pg.js_errors
    context.close()
    assert not errors, f"Error JavaScript: {errors}"
