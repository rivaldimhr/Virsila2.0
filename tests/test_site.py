"""Test end-to-end Virsila (Playwright). Tiap test memakai browser baru, jadi progres mulai dari nol."""
from playwright.sync_api import expect


def data(page, name):
    return page.evaluate(f"window.__virsila.{name}")


# ---------- isi ----------

def test_bank_soal_dan_situasi_valid(page):
    soal = data(page, "SOAL")
    assert len(soal) >= 25
    for q in soal:
        assert len(q["pilihan"]) == 4, q["tanya"]
        assert len(set(q["pilihan"])) == 4, f"pilihan kembar: {q['tanya']}"
        assert 0 <= q["jawaban"] <= 3
        assert q["bahas"].strip()
    assert len({q["tanya"] for q in soal}) == len(soal), "ada soal kembar"
    situasi = data(page, "SITUASI")
    for n in range(1, 6):
        assert sum(1 for s in situasi if s["sila"] == n) == 2, f"sila {n} harus muncul dua kali"


def test_bunyi_sila_resmi(page):
    resmi = [
        "Ketuhanan Yang Maha Esa",
        "Kemanusiaan yang adil dan beradab",
        "Persatuan Indonesia",
        "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
        "Keadilan sosial bagi seluruh rakyat Indonesia",
    ]
    for i, teks in enumerate(resmi, 1):
        page.click(f"#tab-sila-{i}")
        expect(page.locator(".sila-bunyi")).to_have_text(teks)


# ---------- hero & lima sila ----------

def test_hero_menampilkan_lima_lambang_dengan_label_benar(page):
    expect(page.locator(".sila-strip button")).to_have_count(5)
    expect(page.locator(".sila-strip li").nth(4)).to_contain_text("Keadilan sosial")
    expect(page.locator(".sila-strip li").nth(3)).to_contain_text("Kerakyatan")


def test_klik_lambang_hero_membuka_sila(page):
    page.click("[data-ke-sila='3']")
    expect(page.locator(".sila-bunyi")).to_have_text("Persatuan Indonesia")
    expect(page.locator("#tab-sila-3")).to_have_attribute("aria-selected", "true")


def test_tab_sila_bisa_dengan_panah_keyboard(page):
    page.focus("#tab-sila-1")
    page.keyboard.press("ArrowRight")
    expect(page.locator("#tab-sila-2")).to_be_focused()
    expect(page.locator(".sila-bunyi")).to_contain_text("Kemanusiaan")
    page.keyboard.press("ArrowLeft")
    page.keyboard.press("ArrowLeft")
    expect(page.locator(".sila-bunyi")).to_contain_text("Keadilan sosial")


def test_tandai_sila_menaikkan_progres(page):
    page.click("#tandai-sila")
    expect(page.locator("#nav-persen")).to_have_text("4%")
    expect(page.locator("#tab-sila-1 .ok")).to_be_visible()
    expect(page.locator(".sila-strip li").first).to_contain_text("dipelajari")
    page.click("#tandai-sila")  # batal
    expect(page.locator("#nav-persen")).to_have_text("0%")


# ---------- sejarah ----------

def test_linimasa_bisa_dibuka_dan_tercatat(page):
    item = page.locator("#linimasa li").nth(3)
    item.locator("button").click()
    expect(item.locator(".isi")).to_be_visible()
    expect(item.locator(".isi")).to_contain_text("Pancasila")
    expect(item).to_have_class("dibuka")
    expect(page.locator("#cek-list")).to_contain_text("1/10 peristiwa")
    item.locator("button").click()
    expect(item.locator(".isi")).to_be_hidden()


def test_usulan_dan_piagam(page):
    page.click("#usulan-tabs button:has-text('Yamin')")
    expect(page.locator("#usulan-list")).to_contain_text("Peri Kebangsaan")
    expect(page.locator("#piagam-teks del")).to_contain_text("syari'at Islam")
    page.click("#piagam-tombol button:has-text('18 Agustus')")
    expect(page.locator("#piagam-teks ins")).to_have_text("Yang Maha Esa")


def test_rahasia_angka_garuda(page):
    for _ in range(4):
        page.locator("#garuda-grid button:not(.buka)").first.click()
    expect(page.locator("#garuda-hasil")).to_contain_text("17 Agustus 1945")
    expect(page.locator("#cek-list li").nth(2)).to_have_class("ok")


# ---------- praktik ----------

def _jawab_praktik(page, benar=True):
    situasi = {s["teks"]: s["sila"] for s in data(page, "SITUASI")}
    teks = page.locator(".situasi").inner_text()
    sila = situasi[teks]
    pilih = sila if benar else (sila % 5) + 1
    page.click(f".pilih-sila button[data-sila='{pilih}']")
    return sila


def test_praktik_semua_benar(page):
    for _ in range(10):
        _jawab_praktik(page)
        expect(page.locator(".umpan")).to_contain_text("Tepat")
        page.click("#praktik-lanjut")
    expect(page.locator(".skor-akhir")).to_have_text("10/10")
    expect(page.locator("#cek-list")).to_contain_text("terbaik 10/10")


def test_praktik_jawaban_salah_menunjukkan_yang_benar(page):
    sila = _jawab_praktik(page, benar=False)
    expect(page.locator(".umpan")).to_contain_text("Belum tepat")
    expect(page.locator(f".pilih-sila button[data-sila='{sila}']")).to_have_class("benar")
    expect(page.locator(".pilih-sila button").first).to_be_disabled()


# ---------- kuis ----------

def _kunci(page):
    return {q["tanya"]: q["pilihan"][q["jawaban"]] for q in data(page, "SOAL")}


def _jawab_soal(page, kunci, benar=True):
    tanya = page.locator("#soal-teks").inner_text()
    target = kunci[tanya]
    tombol = page.locator(".opsi button")
    for i in range(4):
        teks = tombol.nth(i).locator("span").nth(1).inner_text()
        if (teks == target) == benar:
            tombol.nth(i).click()
            return
    raise AssertionError("pilihan tidak ditemukan")


def test_latihan_memberi_pembahasan_langsung(page):
    kunci = _kunci(page)
    page.click("[data-mode='latihan']")
    _jawab_soal(page, kunci, benar=True)
    expect(page.locator(".bahas")).to_contain_text("Benar.")
    expect(page.locator(".opsi button.benar")).to_have_count(1)
    page.click("#kuis-lanjut")
    _jawab_soal(page, kunci, benar=False)
    expect(page.locator(".bahas")).to_contain_text("Kurang tepat")
    expect(page.locator(".opsi button.salah")).to_have_count(1)


def test_kuis_bisa_dijawab_dengan_keyboard(page):
    page.click("[data-mode='latihan']")
    page.keyboard.press("c")
    expect(page.locator(".bahas")).to_be_visible()


def test_ujian_sempurna_dicatat_di_progres(page):
    kunci = _kunci(page)
    page.click("[data-mode='ujian']")
    expect(page.locator("#waktu")).to_have_text("10:00")
    for i in range(10):
        _jawab_soal(page, kunci)
        page.click("#kuis-lanjut")
    expect(page.locator(".hasil-angka")).to_have_text("100%")
    expect(page.locator(".ulas li")).to_have_count(10)
    expect(page.locator("#cek-list li").nth(4)).to_have_class("ok")


def test_ujian_ulangi_soal_yang_salah(page):
    kunci = _kunci(page)
    page.fill("#nama", "Dina")
    page.locator("#nama").dispatch_event("change")
    page.click("[data-mode='ujian']")
    for i in range(10):
        _jawab_soal(page, kunci, benar=(i >= 3))  # 3 soal pertama sengaja salah
        page.click("#kuis-lanjut")
    expect(page.locator(".hasil-angka")).to_have_text("70%")
    expect(page.locator("#kuis-area")).to_contain_text("Dina")
    expect(page.locator(".ulas li.salah")).to_have_count(3)
    page.click("#ulang-salah")
    expect(page.locator(".kuis-atas")).to_contain_text("Soal 1 dari 3")


def test_timer_ujian_berjalan(page):
    page.click("[data-mode='ujian']")
    page.wait_for_timeout(1300)
    expect(page.locator("#waktu")).not_to_have_text("10:00")


# ---------- progres ----------

def test_progres_tersimpan_setelah_muat_ulang_dan_bisa_direset(page):
    page.click("#tandai-sila")
    page.locator("#linimasa li button").first.click()
    page.reload()
    page.wait_for_selector("#sila-panel h3")
    expect(page.locator("#cek-list")).to_contain_text("1/5 sila")
    expect(page.locator("#cek-list")).to_contain_text("1/10 peristiwa")
    page.click("#reset-progres")
    expect(page.locator("#nav-persen")).to_have_text("0%")


# ---------- tampilan & tautan ----------

def test_ponsel_tanpa_gulir_horizontal(mobile):
    for sel in ["#awal", "#lima-sila", "#sejarah", "#praktik", "#kuis", "#progres"]:
        mobile.locator(sel).scroll_into_view_if_needed()
        overflow = mobile.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        assert overflow <= 1, f"{sel} melebar {overflow}px"


def test_tidak_ada_media_berhak_cipta_lama(page):
    html = page.content()
    for kata in [".mp4", "Kikan", "Poster", "font-awesome"]:
        assert kata not in html
    assert page.locator(".sumber a[href*='bpip.go.id']").count() == 1
