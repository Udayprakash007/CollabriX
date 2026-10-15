import os
from PIL import Image
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

# -------------------------------------------------------------
# Color Constants
# -------------------------------------------------------------
DARK_TEAL_BG = RGBColor(11, 37, 40)         # #0B2528 deep dark teal
DARK_TEAL_CARD = RGBColor(16, 52, 58)       # #10343A card fill
DARK_TEAL_BORDER = RGBColor(20, 184, 166)    # #14B8A6 vibrant teal border
DARK_TEAL_TITLE = RGBColor(255, 255, 255)   # White
DARK_TEAL_SUB = RGBColor(204, 251, 241)     # #CCFBF1 light teal
DARK_TEAL_MUTED = RGBColor(153, 246, 228)   # #99F6E4 soft teal
DARK_TEAL_BADGE_BG = RGBColor(19, 78, 74)   # #134E4A
DARK_TEAL_BADGE_TXT = RGBColor(45, 212, 191)# #2DD4BF

LIGHT_BG = RGBColor(248, 250, 252)          # #F8FAFC
LIGHT_HEADER_TITLE = RGBColor(15, 58, 64)   # #0F3A40 dark teal heading
LIGHT_HEADER_LINE = RGBColor(13, 148, 136)  # #0D9488 teal accent bar
LIGHT_CARD_BG = RGBColor(255, 255, 255)     # #FFFFFF pure white
LIGHT_CARD_BORDER = RGBColor(226, 232, 240) # #E2E8F0
LIGHT_CARD_BORDER_TEAL = RGBColor(153, 246, 228) # #99F6E4
LIGHT_TEXT_MAIN = RGBColor(30, 41, 59)      # #1E293B slate-800
LIGHT_TEXT_MUTED = RGBColor(100, 116, 139)  # #64748B slate-500
LIGHT_ACCENT_TEAL = RGBColor(13, 148, 136)  # #0D9488
LIGHT_HIGHLIGHT_BG = RGBColor(240, 253, 250)# #F0FDFA
LIGHT_HIGHLIGHT_BORDER = RGBColor(94, 234, 212) # #5EEAD4
LIGHT_BADGE_BG = RGBColor(230, 255, 250)    # #E6FFFA
LIGHT_BADGE_TXT = RGBColor(13, 148, 136)

# Assets
IMG_COLLABRIX_LOGO = "src/assets/collabrix-logo.png"
IMG_PARUL_LOGO = "extracted_media/dedbb49b41451b91dd37c81a3f835f4fdc6cd124.png"
IMG_ARCH = "extracted_media/a7c7f7b8a4af5602a8f045d649841844d49f92ac.png"
IMG_ER_CORE = "extracted_media/96f620e32146fb2cb861e395318675afe9ccfb82.png"
IMG_ER_EXT = "extracted_media/image1.png"
IMG_SYNERGY = "extracted_media/dd998406e5412210e99ee066101cfebabc6efcc8.png"
IMG_LIFECYCLE = "extracted_media/image3.png"
IMG_RATING_FLOW = "extracted_media/544d2c927c30a911c0e1d496d83eece308d9401b.png"
IMG_NOTIF_PIPELINE = "extracted_media/image5.png"
IMG_SCREENS_DEV = "extracted_media/image8.png"
IMG_SCREENS_TEAM_CLIENT = "extracted_media/image9.png"
IMG_SCREENS_NOTIF_PROJ = "extracted_media/image10.png"
IMG_CHART_ESLINT = "extracted_media/image11.png"
IMG_CHART_LIGHTHOUSE = "extracted_media/image12.png"
IMG_CHART_DB_TESTS = "extracted_media/image13.png"

# Setup presentation
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]

def set_notes(slide, notes_text):
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.text = notes_text.strip()

def add_full_bg(slide, color):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.color.rgb = color
    return bg

def add_light_header(slide, title_text, kicker_text="COLLABRIX", slide_num=None):
    add_full_bg(slide, LIGHT_BG)
    
    top_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.08))
    top_line.fill.solid()
    top_line.fill.fore_color.rgb = LIGHT_HEADER_LINE
    top_line.line.color.rgb = LIGHT_HEADER_LINE

    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.32), Inches(3.4), Inches(0.32))
    badge.fill.solid()
    badge.fill.fore_color.rgb = LIGHT_BADGE_BG
    badge.line.color.rgb = LIGHT_CARD_BORDER_TEAL
    badge.line.width = Pt(1)
    tf_b = badge.text_frame
    tf_b.margin_left = tf_b.margin_top = tf_b.margin_right = tf_b.margin_bottom = 0
    p_b = tf_b.paragraphs[0]
    p_b.alignment = PP_ALIGN.CENTER
    run_b = p_b.add_run()
    run_b.text = kicker_text.upper()
    run_b.font.bold = True
    run_b.font.size = Pt(10)
    run_b.font.color.rgb = LIGHT_BADGE_TXT
    run_b.font.name = "Arial"

    tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(10.5), Inches(0.65))
    tf_t = tb_title.text_frame
    tf_t.word_wrap = True
    tf_t.margin_left = tf_t.margin_top = tf_t.margin_right = tf_t.margin_bottom = 0
    p_t = tf_t.paragraphs[0]
    run_t = p_t.add_run()
    run_t.text = title_text
    run_t.font.bold = True
    run_t.font.size = Pt(21)
    run_t.font.color.rgb = LIGHT_HEADER_TITLE
    run_t.font.name = "Arial"

    tb_num = slide.shapes.add_textbox(Inches(11.2), Inches(0.35), Inches(1.3), Inches(0.4))
    tf_n = tb_num.text_frame
    tf_n.margin_left = tf_n.margin_top = tf_n.margin_right = tf_n.margin_bottom = 0
    p_n = tf_n.paragraphs[0]
    p_n.alignment = PP_ALIGN.RIGHT
    run_n = p_n.add_run()
    if slide_num:
        run_n.text = f"Slide {slide_num} / 25"
    else:
        run_n.text = "CollabriX"
    run_n.font.size = Pt(11)
    run_n.font.bold = True
    run_n.font.color.rgb = LIGHT_TEXT_MUTED
    run_n.font.name = "Arial"

def add_card(slide, left, top, width, height, bg_color=LIGHT_CARD_BG, border_color=LIGHT_CARD_BORDER, border_width=1):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    if border_color:
        card.line.color.rgb = border_color
        card.line.width = Pt(border_width)
    else:
        card.line.fill.background()
    return card

def add_card_header(slide, left, top, width, height, title, subtitle=None, icon_txt=None):
    tb = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    if icon_txt:
        r_ico = p.add_run()
        r_ico.text = icon_txt + "  "
        r_ico.font.bold = True
        r_ico.font.size = Pt(13)
        r_ico.font.color.rgb = LIGHT_ACCENT_TEAL
        r_ico.font.name = "Arial"
    r_tit = p.add_run()
    r_tit.text = title
    r_tit.font.bold = True
    r_tit.font.size = Pt(13)
    r_tit.font.color.rgb = LIGHT_HEADER_TITLE
    r_tit.font.name = "Arial"

    if subtitle:
        p2 = tf.add_paragraph()
        p2.space_before = Pt(2)
        r_sub = p2.add_run()
        r_sub.text = subtitle
        r_sub.font.size = Pt(9.5)
        r_sub.font.color.rgb = LIGHT_TEXT_MUTED
        r_sub.font.name = "Arial"

def add_bullet(tf, bold_label, text_content, font_size=10.5, prefix_color=LIGHT_ACCENT_TEAL, text_color=LIGHT_TEXT_MAIN):
    p = tf.add_paragraph()
    p.space_before = Pt(3.5)
    p.space_after = Pt(2)
    
    r_sym = p.add_run()
    r_sym.text = "▸ "
    r_sym.font.bold = True
    r_sym.font.size = Pt(font_size)
    r_sym.font.color.rgb = prefix_color
    r_sym.font.name = "Arial"

    if bold_label:
        r_lbl = p.add_run()
        r_lbl.text = bold_label + ": "
        r_lbl.font.bold = True
        r_lbl.font.size = Pt(font_size)
        r_lbl.font.color.rgb = prefix_color
        r_lbl.font.name = "Arial"

    r_txt = p.add_run()
    r_txt.text = text_content
    r_txt.font.size = Pt(font_size)
    r_txt.font.color.rgb = text_color
    r_txt.font.name = "Arial"

def add_image_safe(slide, img_path, left, top, width=None, height=None):
    if os.path.exists(img_path):
        if width and height:
            return slide.shapes.add_picture(img_path, Inches(left), Inches(top), Inches(width), Inches(height))
        elif width:
            return slide.shapes.add_picture(img_path, Inches(left), Inches(top), width=Inches(width))
        elif height:
            return slide.shapes.add_picture(img_path, Inches(left), Inches(top), height=Inches(height))
    return None

# =============================================================
# SLIDE 1: COVER SLIDE (DARK TEAL)
# =============================================================
def slide_01_cover():
    slide = prs.slides.add_slide(BLANK)
    add_full_bg(slide, DARK_TEAL_BG)

    # Accent decorative glow bar
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.6), Inches(11.733), Inches(0.06))
    bar.fill.solid()
    bar.fill.fore_color.rgb = DARK_TEAL_BORDER
    bar.line.color.rgb = DARK_TEAL_BORDER

    # Logo Containers
    add_card(slide, 0.8, 0.9, 2.5, 1.15, bg_color=RGBColor(255, 255, 255), border_color=DARK_TEAL_BORDER, border_width=1.5)
    add_image_safe(slide, IMG_COLLABRIX_LOGO, 0.95, 0.98, width=2.2, height=1.0)

    add_card(slide, 8.833, 0.9, 3.7, 1.15, bg_color=RGBColor(255, 255, 255), border_color=DARK_TEAL_BORDER, border_width=1.5)
    add_image_safe(slide, IMG_PARUL_LOGO, 9.0, 1.05, width=3.35, height=0.85)

    # Project Track Badge
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.35), Inches(5.8), Inches(0.35))
    badge.fill.solid()
    badge.fill.fore_color.rgb = DARK_TEAL_BADGE_BG
    badge.line.color.rgb = DARK_TEAL_BORDER
    badge.line.width = Pt(1)
    tf_b = badge.text_frame
    tf_b.margin_left = tf_b.margin_top = tf_b.margin_right = tf_b.margin_bottom = 0
    p_b = tf_b.paragraphs[0]
    p_b.alignment = PP_ALIGN.CENTER
    r_b = p_b.add_run()
    r_b.text = "B.TECH CAPSTONE PROJECT · GROUP NO. PIET CSE NON ASMP - 8"
    r_b.font.bold = True
    r_b.font.size = Pt(9.5)
    r_b.font.color.rgb = DARK_TEAL_BADGE_TXT

    # Main Project Title
    tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(2.78), Inches(11.7), Inches(1.5))
    tf_t = tb_title.text_frame
    tf_t.word_wrap = True
    tf_t.margin_left = tf_t.margin_top = tf_t.margin_right = tf_t.margin_bottom = 0
    p_t = tf_t.paragraphs[0]
    r_t = p_t.add_run()
    r_t.text = "COLLABRIX"
    r_t.font.bold = True
    r_t.font.size = Pt(44)
    r_t.font.color.rgb = DARK_TEAL_TITLE
    r_t.font.name = "Arial"

    p_sub = tf_t.add_paragraph()
    p_sub.space_before = Pt(4)
    r_sub = p_sub.add_run()
    r_sub.text = "A Team-First Freelance Collaboration Platform"
    r_sub.font.bold = True
    r_sub.font.size = Pt(20)
    r_sub.font.color.rgb = DARK_TEAL_SUB
    r_sub.font.name = "Arial"

    # Team Members Card (Left)
    add_card(slide, 0.8, 4.45, 5.65, 2.5, bg_color=DARK_TEAL_CARD, border_color=DARK_TEAL_BORDER, border_width=1)
    tb_tm = slide.shapes.add_textbox(Inches(1.0), Inches(4.55), Inches(5.25), Inches(2.3))
    tf_tm = tb_tm.text_frame
    tf_tm.margin_left = tf_tm.margin_top = tf_tm.margin_right = tf_tm.margin_bottom = 0
    p_tm_h = tf_tm.paragraphs[0]
    r_tm_h = p_tm_h.add_run()
    r_tm_h.text = "STUDENT TEAM MEMBERS"
    r_tm_h.font.bold = True
    r_tm_h.font.size = Pt(11)
    r_tm_h.font.color.rgb = DARK_TEAL_BADGE_TXT

    members = [
        ("Jaghatha Uday Prakash", "2303031240447"),
        ("Boddu Venkata Sai Kowshik", "2303031241591"),
        ("Katreddi Hima Nagendra", "2303031240520"),
        ("Immadi Venkata Rama Chaitanya Vardhan", "2303031240436")
    ]
    for name, roll in members:
        p_m = tf_tm.add_paragraph()
        p_m.space_before = Pt(3)
        r_name = p_m.add_run()
        r_name.text = f"• {name}  "
        r_name.font.bold = True
        r_name.font.size = Pt(11.5)
        r_name.font.color.rgb = DARK_TEAL_TITLE
        r_id = p_m.add_run()
        r_id.text = f"[{roll}]"
        r_id.font.size = Pt(10)
        r_id.font.color.rgb = DARK_TEAL_MUTED

    # Project Guide & Institutional Details (Right)
    add_card(slide, 6.75, 4.45, 5.78, 2.5, bg_color=DARK_TEAL_CARD, border_color=DARK_TEAL_BORDER, border_width=1)
    tb_gd = slide.shapes.add_textbox(Inches(6.95), Inches(4.55), Inches(5.35), Inches(2.3))
    tf_gd = tb_gd.text_frame
    tf_gd.margin_left = tf_gd.margin_top = tf_gd.margin_right = tf_gd.margin_bottom = 0
    p_gd_h = tf_gd.paragraphs[0]
    r_gd_h = p_gd_h.add_run()
    r_gd_h.text = "PROJECT GUIDANCE & INSTITUTION"
    r_gd_h.font.bold = True
    r_gd_h.font.size = Pt(11)
    r_gd_h.font.color.rgb = DARK_TEAL_BADGE_TXT

    details = [
        ("Project Guide", "Assistant Prof. Barkha Makwana"),
        ("Degree", "Bachelor of Technology in Computer Science & Engineering"),
        ("Specialization", "Artificial Intelligence"),
        ("Department", "PIET · Faculty of Engineering & Technology"),
        ("University", "Parul University, Vadodara · October 2026")
    ]
    for label, val in details:
        p_d = tf_gd.add_paragraph()
        p_d.space_before = Pt(2.5)
        r_l = p_d.add_run()
        r_l.text = f"{label}: "
        r_l.font.bold = True
        r_l.font.size = Pt(10.5)
        r_l.font.color.rgb = DARK_TEAL_MUTED
        r_v = p_d.add_run()
        r_v.text = val
        r_v.font.size = Pt(10.5)
        r_v.font.color.rgb = DARK_TEAL_TITLE

    set_notes(slide, 
        "Good morning respected guide Assistant Professor Barkha Makwana, respected evaluators, and colleagues. "
        "Welcome to our final year capstone project presentation on CollabriX: A Team-First Freelance Collaboration Platform. "
        "My name is Jaghatha Uday Prakash, presenting alongside my team members Boddu Venkata Sai Kowshik, "
        "Katreddi Hima Nagendra, and Immadi Venkata Rama Chaitanya Vardhan from the Department of Computer Science "
        "and Engineering with specialization in Artificial Intelligence at Parul University. "
        "Over the next 25 slides, we will demonstrate why contemporary freelance marketplaces fail modern cross-functional "
        "software development, introduce the CollabriX team-first paradigm, explore our 12-table relational schema and "
        "PostgreSQL Row-Level Security architecture, walk through our synergy and leaderboard algorithms, review live application "
        "screens, and share our rigorous verification results comprising 104 passing database integrity tests and perfect Lighthouse scores."
    )

# =============================================================
# SLIDE 2: AGENDA (LIGHT)
# =============================================================
def slide_02_agenda():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Presentation Roadmap", "EXECUTIVE AGENDA", 2)

    tracks = [
        ("Phase 1: Foundation & Motivation", "Slides 3 – 7", [
            ("Industry Problem", "Failure of individual-only gig models"),
            ("The Solution", "The CollabriX team-first paradigm"),
            ("Project Objectives", "5 core architectural design goals"),
            ("Literature Survey", "Academic foundations & related works"),
            ("Platform Comparison", "CollabriX vs. Upwork, Fiverr, etc.")
        ]),
        ("Phase 2: Architecture & Data", "Slides 8 – 11", [
            ("Technology Stack", "React 18, Vite, Supabase, Postgres 16"),
            ("System Architecture", "4-Tier layered system blueprint"),
            ("Database Design", "12-Table relational schema overview"),
            ("5 Extension Tables", "Team batches, notifications, invites, settings")
        ]),
        ("Phase 3: Workflows & Algorithms", "Slides 12 – 19", [
            ("Connections & Peers", "LinkedIn-style peer networking"),
            ("Synergy Algorithm", "Algorithm 1: Domain skill coverage"),
            ("Project Lifecycle", "State machine & invitation-gated assigning"),
            ("Security & RLS", "PostgreSQL Row-Level Security & RPCs"),
            ("Ratings & Reviews", "Two-way completion-gated trust rules"),
            ("Notifications", "Database trigger-driven event pipeline"),
            ("Leaderboard Formula", "Algorithm 2: Verifiable delivery math")
        ]),
        ("Phase 4: Walkthrough & Results", "Slides 20 – 25", [
            ("UI Screenshots", "Developer profile & real-time chat"),
            ("UI Screenshots", "Team batch engine & client dashboard"),
            ("UI Screenshots", "Notifications & project lifecycle"),
            ("Verification Suite", "104 DB checks, 18 browser tests, Lighthouse"),
            ("Roadmap & Limitations", "Current boundaries & future vision"),
            ("Conclusion & Q&A", "Key takeaways & open floor")
        ])
    ]

    card_w = 2.75
    gap = 0.24
    top_pos = 1.45
    card_h = 5.5

    for idx, (title, slides_range, items) in enumerate(tracks):
        left_pos = 0.8 + idx * (card_w + gap)
        add_card(slide, left_pos, top_pos, card_w, card_h)
        add_card_header(slide, left_pos + 0.15, top_pos + 0.15, card_w - 0.3, 0.7, title, slides_range, icon_txt=f"0{idx+1}")
        
        tb = slide.shapes.add_textbox(Inches(left_pos + 0.15), Inches(top_pos + 0.95), Inches(card_w - 0.3), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        for bold_txt, desc_txt in items:
            add_bullet(tf, bold_txt, desc_txt, font_size=10)

    set_notes(slide,
        "Here is our presentation roadmap structured into four distinct phases across 25 slides. "
        "In Phase 1, we establish the problem space: why individual-only gig platforms fail cross-functional software projects, "
        "and benchmark CollabriX against Upwork, Fiverr, Freelancer, and Toptal. "
        "In Phase 2, we dive into engineering, detailing our 4-tier architecture and 12-table relational database schema. "
        "In Phase 3, we dissect our core mathematical workflows: team synergy calculations, project lifecycle state machines, "
        "Row-Level Security policies, and our open leaderboard formula. "
        "Finally, in Phase 4, we showcase real application screenshots, review our 104 automated database test cases and "
        "Lighthouse performance audits, and discuss future enhancements."
    )

print("Slide 2 defined.")

# =============================================================
# SLIDE 3: PROBLEM (LIGHT)
# =============================================================
def slide_03_problem():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "The Problem: Structural Gaps in Gig Marketplaces", "INDUSTRY CHALLENGE", 3)

    # Top highlight callout card
    top_box = add_card(slide, 0.8, 1.45, 11.733, 0.8, bg_color=LIGHT_HIGHLIGHT_BG, border_color=LIGHT_HIGHLIGHT_BORDER)
    tb_top = slide.shapes.add_textbox(Inches(1.0), Inches(1.53), Inches(11.3), Inches(0.65))
    tf_top = tb_top.text_frame
    tf_top.word_wrap = True
    p_top = tf_top.paragraphs[0]
    r_top_b = p_top.add_run()
    r_top_b.text = "CORE REALITY: "
    r_top_b.font.bold = True
    r_top_b.font.size = Pt(11)
    r_top_b.font.color.rgb = LIGHT_ACCENT_TEAL
    r_top_t = p_top.add_run()
    r_top_t.text = "Modern software is assembled by cross-functional teams (Front-end, Back-end, Cloud, UI/UX), yet mainstream freelance marketplaces force a rigid 'one-client to one-freelancer' hiring model."
    r_top_t.font.size = Pt(11)
    r_top_t.font.color.rgb = LIGHT_TEXT_MAIN

    # 5 Problem Dimensions Grid
    problems = [
        ("01", "Individual-Only Model", "Zero native peer teaming", 
         "Platforms like Upwork and Fiverr treat developers as isolated solitary sellers. There is no first-class mechanism for developers to discover peers and bid collaboratively as a team."),
        ("02", "Severe Bidding Fatigue", "Wasteful unpaid bidding cycles", 
         "Clients are overwhelmed by hundreds of generic proposals. Freelancers spend hours writing unpaid bids instead of building software, leading to low hit-rates and frustration."),
        ("03", "Weak Rating Integrity", "Rampant 5-star review inflation", 
         "Reviews are decoupled from completed deliverables. Feedback inflation degrades rating signals over time, making star ratings unreliable indicators of actual engineering competence."),
        ("04", "Communication Silos", "Lost context across external apps", 
         "Collaboration inevitably spills over to external apps like WhatsApp, Discord, or email. The platform loses project context, auditability, and dispute resolution clarity."),
        ("05", "Cold-Start Barrier", "Invisible newcomers", 
         "New entrants without an established review history are invisible in search algorithms, regardless of actual technical skill, creating an insurmountable barrier for student talent.")
    ]

    card_w = 3.65
    gap_x = 0.39
    card_h = 2.1
    positions = [
        (0.8, 2.45),
        (4.84, 2.45),
        (8.88, 2.45),
        (2.82, 4.75),
        (6.86, 4.75)
    ]

    for idx, (num, title, sub, desc) in enumerate(problems):
        lx, ly = positions[idx]
        add_card(slide, lx, ly, card_w, card_h)
        add_card_header(slide, lx + 0.15, ly + 0.15, card_w - 0.3, 0.55, title, sub, icon_txt=num)
        tb = slide.shapes.add_textbox(Inches(lx + 0.15), Inches(ly + 0.75), Inches(card_w - 0.3), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        r = p.add_run()
        r.text = desc
        r.font.size = Pt(10)
        r.font.color.rgb = LIGHT_TEXT_MAIN
        r.font.name = "Arial"

    set_notes(slide,
        "Turning to Slide 3, we analyze the structural breakdown in contemporary freelance platforms. "
        "The fundamental flaw is the individual-only hiring paradigm. While modern software demands multi-disciplinary teams, "
        "platforms like Upwork and Fiverr are architected around a single seller profile. This mismatch causes five severe issues: "
        "First, developers cannot officially team up on-platform. "
        "Second, clients face proposal fatigue while developers waste countless unpaid hours submitting blind bids. "
        "Third, reputation systems suffer from systemic star inflation because reviews are not cryptographically or relationally tied to completed deliverables. "
        "Fourth, communication splinters across WhatsApp and Slack, depriving the platform of context. "
        "And fifth, early-career and student developers face an impenetrable cold-start barrier because search ranking algorithms heavily favor historical volume over verified skill."
    )

# =============================================================
# SLIDE 4: SOLUTION (LIGHT)
# =============================================================
def slide_04_solution():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "The Solution: CollabriX Team-First Paradigm", "CORE INNOVATION", 4)

    # Left Column: The Paradigm Shift
    add_card(slide, 0.8, 1.45, 5.65, 4.5)
    add_card_header(slide, 0.95, 1.6, 5.35, 0.65, "The Paradigm Shift", "From Solitary Bidding to Collaborative Delivery", icon_txt="🔄")
    tb_l = slide.shapes.add_textbox(Inches(0.95), Inches(2.35), Inches(5.35), Inches(3.4))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = tf_l.margin_top = tf_l.margin_right = tf_l.margin_bottom = 0
    
    add_bullet(tf_l, "Team-First Architecture", "Collaboration is the core data primitive rather than a cosmetic afterthought. Developers assemble complementary teams directly on-platform.")
    add_bullet(tf_l, "Multi-Regional Peer Discovery", "Discover peers by continent, sub-region, country, and tech stack to form time-zone aligned development squads.")
    add_bullet(tf_l, "Dynamic Team Batches", "Group up to 10 verified connections into reusable team units with distinct project roles and automated skill coverage calculations.")
    add_bullet(tf_l, "Dual Role-Based Workspaces", "Dedicated client dashboard for posting work and managing teams, paired with a rich developer hub for networking and jobs.")

    # Right Column: Four Pillars
    add_card(slide, 6.75, 1.45, 5.78, 4.5)
    add_card_header(slide, 6.9, 1.6, 5.48, 0.65, "Four Architectural Pillars", "Engineered for Integrity & High Performance", icon_txt="🏛️")
    tb_r = slide.shapes.add_textbox(Inches(6.9), Inches(2.35), Inches(5.48), Inches(3.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "1. Algorithmic Synergy Engine", "Mathematically computes skill complementarity against domain benchmarks, identifying missing technology gaps before bidding.")
    add_bullet(tf_r, "2. Relational State Enforcement", "PostgreSQL triggers and constraints prevent invalid transitions, fake reviews, and unauthorized assignments at the database level.")
    add_bullet(tf_r, "3. Zero-Baseline Reputation", "Public leaderboard computed exclusively from completed client contracts, eliminating synthetic baseline ratings and bias.")
    add_bullet(tf_r, "4. Sub-Second Realtime Messaging", "WebSocket-driven peer chat and automated notifications without polling overhead or communication leakage.")

    # Bottom Callout Bar
    add_card(slide, 0.8, 6.1, 11.733, 0.9, bg_color=LIGHT_HIGHLIGHT_BG, border_color=LIGHT_HIGHLIGHT_BORDER)
    tb_b = slide.shapes.add_textbox(Inches(1.0), Inches(6.2), Inches(11.3), Inches(0.7))
    tf_b = tb_b.text_frame
    tf_b.word_wrap = True
    p_b = tf_b.paragraphs[0]
    r_b1 = p_b.add_run()
    r_b1.text = "KEY VALUE PROPOSITION: "
    r_b1.font.bold = True
    r_b1.font.size = Pt(11)
    r_b1.font.color.rgb = LIGHT_ACCENT_TEAL
    r_b2 = p_b.add_run()
    r_b2.text = "CollabriX enables student and early-career developers to pool complementary skills, compete for larger and higher-paying commercial software contracts, and build an unforgeable verified track record."
    r_b2.font.size = Pt(11)
    r_b2.font.color.rgb = LIGHT_TEXT_MAIN

    set_notes(slide,
        "On Slide 4, we introduce the CollabriX solution. The name combines 'Collaboration' with 'X'—representing the multiplier effect of team synergy. "
        "Instead of treating developers as isolated competitors in a race to the bottom, CollabriX provides a first-class collaborative workspace. "
        "Our system is founded on four architectural pillars: "
        "First, dynamic team batching with our synergy scoring engine, which evaluates a squad's tech stack against project domains. "
        "Second, database-enforced relational governance using PostgreSQL Row-Level Security, guaranteeing that no state or rating can be forged. "
        "Third, a transparent zero-baseline leaderboard that rewards verified delivery rather than opaque commercial algorithms. "
        "And fourth, sub-second WebSocket communication keeping teams aligned without external tool fragmentation."
    )

# =============================================================
# SLIDE 5: OBJECTIVES (LIGHT)
# =============================================================
def slide_05_objectives():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Project Objectives & Design Goals", "ENGINEERING TARGETS", 5)

    objectives = [
        ("01", "Dual Role-Based Workspaces", 
         "Implement strict architectural and UI separation between Developer and Client experiences, guaranteeing tailored navigation, role-specific tooling, and secure data isolation."),
        ("02", "Automated Synergy Matching", 
         "Design and implement Algorithm 1 to match combined team member skills against standardized industry domain stacks, dynamically flagging missing technology gaps."),
        ("03", "Database-Enforced Lifecycle", 
         "Construct a deterministic 4-state project machine (Open → In Progress → Completed / Cancelled) where project assignment and ratings require relational proof of prior stages."),
        ("04", "Meritocratic Leaderboard Ranking", 
         "Formulate Algorithm 2 in PostgreSQL RPC without arbitrary baseline scores, ranking developers deterministically based strictly on verified delivery volume and client star ratings."),
        ("05", "Sub-Second Event-Driven Collaboration", 
         "Deliver instantaneous peer-to-peer messaging and trigger-generated notifications using Supabase Realtime WebSockets, completely eliminating client-side polling latency.")
    ]

    card_h = 0.95
    gap_y = 0.16
    start_y = 1.45

    for idx, (num, title, desc) in enumerate(objectives):
        top_y = start_y + idx * (card_h + gap_y)
        add_card(slide, 0.8, top_y, 11.733, card_h)
        
        # Number badge
        num_badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.95), Inches(top_y + 0.18), Inches(0.65), Inches(0.58))
        num_badge.fill.solid()
        num_badge.fill.fore_color.rgb = LIGHT_BADGE_BG
        num_badge.line.color.rgb = LIGHT_CARD_BORDER_TEAL
        tf_nb = num_badge.text_frame
        p_nb = tf_nb.paragraphs[0]
        p_nb.alignment = PP_ALIGN.CENTER
        r_nb = p_nb.add_run()
        r_nb.text = num
        r_nb.font.bold = True
        r_nb.font.size = Pt(13)
        r_nb.font.color.rgb = LIGHT_ACCENT_TEAL

        # Text block
        tb = slide.shapes.add_textbox(Inches(1.8), Inches(top_y + 0.12), Inches(10.5), Inches(0.72))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p_tit = tf.paragraphs[0]
        r_tit = p_tit.add_run()
        r_tit.text = title + " — "
        r_tit.font.bold = True
        r_tit.font.size = Pt(12)
        r_tit.font.color.rgb = LIGHT_HEADER_TITLE
        
        r_desc = p_tit.add_run()
        r_desc.text = desc
        r_desc.font.size = Pt(10.5)
        r_desc.font.color.rgb = LIGHT_TEXT_MAIN

    set_notes(slide,
        "Slide 5 outlines our five primary engineering objectives. "
        "First, establish dual role-based workspaces for developers and clients with distinct permissions and interfaces. "
        "Second, build an automated team formation engine powered by Algorithm 1 that evaluates skill complementarity and highlights technology gaps. "
        "Third, govern project lifecycles at the database layer so that assignments and reviews cannot bypass verified states. "
        "Fourth, design a meritocratic leaderboard algorithm implemented directly as a PostgreSQL stored procedure, removing opaque ranking biases. "
        "And fifth, integrate sub-second WebSocket synchronization for real-time messaging and trigger-driven notifications."
    )

# =============================================================
# SLIDE 6: LITERATURE SURVEY (LIGHT)
# =============================================================
def slide_06_literature():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Literature Survey: Theoretical Foundations", "ACADEMIC CONTEXT", 6)

    studies = [
        ("Agrawal, Horton, Lacetera & Lyons (2015)", "Digitization and the Contract Labor Market",
         "Demonstrated that online labor markets exhibit severe spatial and informational frictions; geographic clustering and time-zone alignment strongly dictate hiring success.",
         "CollabriX Implication: Implemented hierarchical regional filtering (Continent → Sub-region → Country) allowing developers to discover peers in compatible working time-zones."),
        ("Filippas, Horton & Golden (2020)", "Reputation Inflation in the Gig Economy",
         "Disclosed that conventional 5-star rating mechanisms suffer extreme upward grade inflation, severely diminishing their signaling power for clients.",
         "CollabriX Implication: Implemented completion-gated two-way reviews locked behind database triggers, ensuring ratings only originate from verified completed contracts."),
        ("Retelny et al. (2014) & Valentine et al. (2017)", "Flash Teams & Flash Organizations",
         "Proved that crowd workers dynamically assembled into structured teams can accomplish complex, open-ended engineering goals when provided with role structures.",
         "CollabriX Implication: Designed our native Team Batch engine, providing project domain role assignments and automated skill complementarity calculations."),
        ("Hannák et al. (2017)", "Bias in Online Freelance Marketplaces",
         "Found that commercial algorithmic ranking engines introduce systematic visibility barriers against newcomers and non-traditional freelancers.",
         "CollabriX Implication: Engineered a transparent, deterministic leaderboard formula based on volume of delivered work, eliminating opaque corporate ranking algorithms.")
    ]

    card_w = 5.65
    gap_x = 0.43
    card_h = 2.45
    coords = [(0.8, 1.45), (6.88, 1.45), (0.8, 4.15), (6.88, 4.15)]

    for idx, (authors, title, finding, impl) in enumerate(studies):
        lx, ly = coords[idx]
        add_card(slide, lx, ly, card_w, card_h)
        add_card_header(slide, lx + 0.15, ly + 0.12, card_w - 0.3, 0.6, authors, title, icon_txt=f"[{idx+1}]")
        
        tb = slide.shapes.add_textbox(Inches(lx + 0.15), Inches(ly + 0.78), Inches(card_w - 0.3), Inches(1.55))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        add_bullet(tf, "Research Finding", finding, font_size=10, prefix_color=LIGHT_TEXT_MUTED)
        add_bullet(tf, "CollabriX Adoption", impl, font_size=10, prefix_color=LIGHT_ACCENT_TEAL)

    set_notes(slide,
        "Slide 6 reviews the academic literature informing our engineering decisions, drawn from Chapter 2 of our project report. "
        "Studies by Agrawal et al. highlighted that geographic and time-zone frictions heavily degrade solo freelancing; we resolved this with hierarchical region-based discovery. "
        "Filippas and colleagues documented the crisis of rating inflation in the gig economy, where almost every worker is rated 5 stars; we mitigated this by locking ratings behind completion-gated relational triggers. "
        "Seminal research on Flash Teams from Stanford by Retelny and Valentine demonstrated that online crowd workers succeed on complex software tasks when platforms provide structural role scaffolding—the exact premise of our Team Formation Engine. "
        "Finally, Hannák et al. exposed algorithmic ranking biases against newcomers; we solved this with an open, mathematically deterministic ranking formula."
    )

# =============================================================
# SLIDE 7: COMPARISON TABLE (LIGHT)
# =============================================================
def slide_07_comparison():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Comparative Analysis: CollabriX vs. Market Leaders", "COMPETITIVE BENCHMARK", 7)

    # Table dimensions
    rows_data = [
        ("Feature / Aspect", "Upwork", "Fiverr", "Freelancer", "Toptal", "CollabriX (Ours)"),
        ("Hiring Model", "Job post + proposals", "Fixed gigs / packages", "Bidding & contests", "Curated 3% matching", "Profiles + Open Teams"),
        ("Peer Discovery", "Limited / absent", "None", "Limited", "None", "Full Search & Connect"),
        ("Form Teams on Platform", "Agencies only", "No", "No", "Manual staff match", "Yes (Team Batches)"),
        ("Team Synergy Scoring", "None", "None", "None", "Manual recruiter", "Algorithmic (Alg. 1)"),
        ("Rating Governance", "Platform policy", "Review-based", "Contest feedback", "Internal scoring", "PostgreSQL RLS Triggers"),
        ("Client Commission", "Up to 10%", "Up to 20%", "10% + fees", "High corporate premium", "0% (Open Academic)"),
        ("Ranking Transparency", "Opaque JSS score", "Proprietary algorithm", "Bid amount priority", "Internal discretion", "Public Math Formula")
    ]

    t_left = Inches(0.8)
    t_top = Inches(1.45)
    t_width = Inches(11.733)
    t_height = Inches(5.3)

    table_shape = slide.shapes.add_table(len(rows_data), 6, t_left, t_top, t_width, t_height)
    table = table_shape.table

    col_widths = [Inches(2.533), Inches(1.8), Inches(1.8), Inches(1.8), Inches(1.8), Inches(2.0)]
    for i, w in enumerate(col_widths):
        table.columns[i].width = w

    for r_idx, row in enumerate(rows_data):
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx, c_idx)
            cell.text = ""
            p = cell.text_frame.paragraphs[0]
            p.alignment = PP_ALIGN.CENTER if c_idx > 0 else PP_ALIGN.LEFT
            r = p.add_run()
            r.text = val
            r.font.name = "Arial"
            
            if r_idx == 0:
                cell.fill.solid()
                cell.fill.fore_color.rgb = DARK_TEAL_BG if c_idx == 5 else RGBColor(30, 41, 59)
                r.font.bold = True
                r.font.size = Pt(11)
                r.font.color.rgb = RGBColor(255, 255, 255)
            else:
                cell.fill.solid()
                if c_idx == 5:
                    cell.fill.fore_color.rgb = RGBColor(240, 253, 250)
                    r.font.bold = True
                    r.font.color.rgb = LIGHT_ACCENT_TEAL
                else:
                    cell.fill.fore_color.rgb = RGBColor(255, 255, 255) if r_idx % 2 == 1 else RGBColor(248, 250, 252)
                    r.font.color.rgb = LIGHT_TEXT_MAIN
                r.font.size = Pt(10)

    set_notes(slide,
        "Slide 7 benchmark-tests CollabriX against industry titans Upwork, Fiverr, Freelancer, and Toptal, reproducing Table 2.1 from our report. "
        "Notice the structural divergence: on Upwork, teaming is restricted solely to formal legal agencies; on Fiverr and Freelancer, it is nonexistent. "
        "Toptal coordinates teams only through high-cost internal recruiters. "
        "CollabriX is the only platform that offers dynamic, first-class peer discovery, native Team Batches with algorithmic synergy evaluation, "
        "database-level rating integrity enforced by PostgreSQL RLS, and a public, mathematically verifiable leaderboard."
    )

print("Slides 3 to 7 appended.")

# =============================================================
# SLIDE 8: TECH STACK (LIGHT)
# =============================================================
def slide_08_tech_stack():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Technology Stack & Technical Justification", "ENGINEERING FOUNDATION", 8)

    tiers = [
        ("Frontend Application", "Modern, Reactive & Type-Safe", "⚡", [
            ("React 18", "Component-driven reactive UI architecture with efficient virtual DOM reconciliation."),
            ("TypeScript 5", "Strict static type system synchronized directly with generated Supabase database types."),
            ("Vite Bundler", "Lightning-fast Hot Module Replacement (HMR) and optimized Rollup production builds (< 2s).")
        ]),
        ("UI & Styling System", "Design System & Accessibility", "🎨", [
            ("Tailwind CSS", "Utility-first design tokens with customized teal/slate palettes and responsive breakpoints."),
            ("shadcn/ui & Radix", "Accessible, unstyled headless primitives (Dialogs, Dropdowns, Badges, Tabs, Tooltips)."),
            ("Lucide Icons", "Crisp, lightweight SVG icons consistent across all developer and client modules.")
        ]),
        ("State & Client Data", "Server-State Caching & Validation", "🔄", [
            ("TanStack Query v5", "Declarative server-state caching, automatic background invalidation, and optimistic UI updates."),
            ("Zod Schema Engine", "Strict runtime form and payload schema validation preventing malformed API requests."),
            ("React Router 6", "Protected declarative routing with client-side role guards and session restoration.")
        ]),
        ("Backend & Database", "BaaS & Relational Security", "🛡️", [
            ("Supabase BaaS", "Managed GoTrue authentication, PostgREST API generation, and Realtime WebSocket engine."),
            ("PostgreSQL 16", "Enterprise relational database with ACID compliance, custom ENUMs, triggers, and RPCs."),
            ("Row-Level Security", "Database-level policy enforcement isolating multi-tenant rows via auth.uid() tokens.")
        ])
    ]

    card_w = 2.75
    gap_x = 0.24
    card_h = 5.3
    top_pos = 1.45

    for idx, (title, sub, ico, items) in enumerate(tiers):
        lx = 0.8 + idx * (card_w + gap_x)
        add_card(slide, lx, top_pos, card_w, card_h)
        add_card_header(slide, lx + 0.15, top_pos + 0.15, card_w - 0.3, 0.65, title, sub, icon_txt=ico)
        
        tb = slide.shapes.add_textbox(Inches(lx + 0.15), Inches(top_pos + 0.9), Inches(card_w - 0.3), Inches(4.2))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        for name, desc in items:
            add_bullet(tf, name, desc, font_size=10)

    set_notes(slide,
        "Slide 8 outlines the four layers of our technology stack, justified in Table 3.1 of our report. "
        "On the client, React 18 and Vite deliver sub-2-second build times and rapid HMR, while TypeScript enforces strict "
        "type consistency with our Supabase database schema. "
        "Our UI pairs Tailwind CSS with accessible shadcn/ui primitives. "
        "For client-side caching and state synchronization, TanStack Query provides optimistic updates and automatic cache invalidation. "
        "Crucially, instead of writing a redundant Express.js backend layer that introduces latency and vulnerability surfaces, "
        "we leverage Supabase with PostgreSQL 16. Business rules, validation triggers, and access control policies live directly inside the database, "
        "broadcasting instant state updates via Supabase Realtime WebSockets."
    )

# =============================================================
# SLIDE 9: ARCHITECTURE (LIGHT)
# =============================================================
def slide_09_architecture():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "System Architecture: 4-Tier Layered Blueprint", "SYSTEM DESIGN", 9)

    # Left: Architecture Diagram
    add_card(slide, 0.8, 1.45, 5.8, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.5, 0.5, "Architectural Blueprint", "Figure 3.3 from Project Report", icon_txt="📐")
    add_image_safe(slide, IMG_ARCH, 0.95, 2.15, width=5.5, height=4.4)

    # Right: Layer Responsibilities Breakdown
    add_card(slide, 6.85, 1.45, 5.68, 5.3)
    add_card_header(slide, 7.0, 1.6, 5.38, 0.5, "Tier Responsibilities & Flow", "End-to-End Separation of Concerns", icon_txt="⚙️")
    
    tb_r = slide.shapes.add_textbox(Inches(7.0), Inches(2.15), Inches(5.38), Inches(4.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "Tier 1: Presentation Layer", "Responsive mobile-first React components, shadcn/ui modals, navigation drawers, and Sonner toast alerts with dark teal design tokens.")
    add_bullet(tf_r, "Tier 2: Client State Layer", "Custom domain hooks (useAuth, useUserRole, useProjects, useNotificationFeed) decoupling business state from React views via TanStack Query.")
    add_bullet(tf_r, "Tier 3: Backend-as-a-Service", "Supabase GoTrue service for JWT session management, PostgREST for autogenerated REST endpoints, and WebSocket channels for realtime sync.")
    add_bullet(tf_r, "Tier 4: Relational Security Layer", "PostgreSQL 16 relational engine enforcing Row-Level Security (RLS) policies, security-definer RPC functions, and automated event triggers.")

    set_notes(slide,
        "Slide 9 displays the four-tier architectural blueprint of CollabriX, representing Figure 3.3 from our documentation. "
        "At the top is the Presentation Layer, built with responsive mobile-first React components and accessible Radix primitives. "
        "Directly below it, the Client State Layer isolates server communication into modular React hooks like useAuth, useProjects, and useNotificationFeed, "
        "ensuring clean separation of concerns and eliminating component-level side effects. "
        "The third tier is the Backend-as-a-Service layer powered by Supabase, providing authenticated PostgREST queries and WebSocket subscriptions. "
        "The foundational tier is PostgreSQL 16. By anchoring authorization, state machines, and notification creation inside the database engine, "
        "CollabriX guarantees zero unauthorized operations even if a client attempts to bypass the web frontend."
    )

# =============================================================
# SLIDE 10: DATABASE 12 TABLES OVERVIEW (LIGHT)
# =============================================================
def slide_10_database_overview():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Database Architecture: 12 Relational Tables", "DATA PERSISTENCE", 10)

    # Left: 7 Core Tables
    add_card(slide, 0.8, 1.45, 5.75, 4.2)
    add_card_header(slide, 0.95, 1.6, 5.45, 0.55, "7 Core Foundation Tables", "Original sprint schema managing identity & jobs", icon_txt="📂")
    tb_c = slide.shapes.add_textbox(Inches(0.95), Inches(2.2), Inches(5.45), Inches(3.3))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True
    tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0

    core_tables = [
        ("profiles", "Public identity: name, avatar, bio, developer type, skills, region (PK = auth.users.id CASCADE)."),
        ("user_roles", "Authorisation roles: developer or client enum with UNIQUE(user_id, role) constraint."),
        ("connections", "LinkedIn-style peer requests between developers: sender, receiver, status (pending/accepted)."),
        ("messages", "Realtime chat messages inside accepted connections; enabled for WebSocket replication."),
        ("projects", "Client project postings: title, scope, budget, complexity (Easy/Med/Hard), status lifecycle."),
        ("project_ratings", "Multi-dimensional project feedback (1–5 stars) submitted upon verified completion."),
        ("user_ratings", "Peer-to-peer user evaluation (1–5 stars) linked to completed project contracts.")
    ]
    for tbl, desc in core_tables:
        add_bullet(tf_c, tbl, desc, font_size=9.5)

    # Right: 5 New Extension Tables
    add_card(slide, 6.78, 1.45, 5.75, 4.2)
    add_card_header(slide, 6.93, 1.6, 5.45, 0.55, "5 Collaboration Extension Tables", "Added in final sprint for teams & governance", icon_txt="✨")
    tb_e = slide.shapes.add_textbox(Inches(6.93), Inches(2.2), Inches(5.45), Inches(3.3))
    tf_e = tb_e.text_frame
    tf_e.word_wrap = True
    tf_e.margin_left = tf_e.margin_top = tf_e.margin_right = tf_e.margin_bottom = 0

    ext_tables = [
        ("team_batches", "Saved developer squads: 1–10 members, accepted connections only, synergy score."),
        ("notifications", "System-generated audit feed; 10 event types; rows created solely by DB triggers."),
        ("project_invitations", "Client-to-developer formal invitations; UNIQUE(project, dev); developer accepts first."),
        ("user_settings", "User privacy: leaderboard visibility toggle, email/in-app notification preferences."),
        ("support_tickets", "Platform helpdesk: auto-generated ticket numbering with subject/description length CHECKs.")
    ]
    for tbl, desc in ext_tables:
        add_bullet(tf_e, tbl, desc, font_size=9.5)

    # Bottom Callout Summary
    add_card(slide, 0.8, 5.8, 11.733, 1.2, bg_color=LIGHT_HIGHLIGHT_BG, border_color=LIGHT_HIGHLIGHT_BORDER)
    tb_b = slide.shapes.add_textbox(Inches(1.0), Inches(5.9), Inches(11.3), Inches(1.0))
    tf_b = tb_b.text_frame
    tf_b.word_wrap = True
    p_b1 = tf_b.paragraphs[0]
    r_b1 = p_b1.add_run()
    r_b1.text = "DATABASE INTEGRITY SUMMARY: "
    r_b1.font.bold = True
    r_b1.font.size = Pt(11)
    r_b1.font.color.rgb = LIGHT_ACCENT_TEAL
    r_b2 = p_b1.add_run()
    r_b2.text = "All 12 tables reside in PostgreSQL's public schema. Every profile shares its primary key with Supabase's auth.users table, making auth.uid() directly comparable in Row-Level Security policies. Referential cascades guarantee zero orphaned records upon user deletion."
    r_b2.font.size = Pt(10.5)
    r_b2.font.color.rgb = LIGHT_TEXT_MAIN

    set_notes(slide,
        "Turning to Slide 10, CollabriX is built upon twelve relational tables in the public PostgreSQL schema, detailed in Table 3.10 of our report. "
        "The architecture is bifurcated into two groups: "
        "The seven core tables manage user profiles, role enforcement, peer connections, realtime messages, project listings, and dual-party ratings. "
        "The collaboration extension introduced five new tables: team_batches for squad composition, notifications for trigger-driven alerts, "
        "project_invitations for client outreach, user_settings for privacy control, and support_tickets for issue reporting. "
        "Every profile primary key links directly to auth.users with ON DELETE CASCADE, allowing Row-Level Security policies to evaluate auth.uid() efficiently."
    )

# =============================================================
# SLIDE 11: 5 NEW TABLES DEEP DIVE (LIGHT)
# =============================================================
def slide_11_five_new_tables():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Database Design: The 5 New Tables Deep-Dive", "DATABASE ENGINEERING", 11)

    cards_info = [
        ("team_batches", "Collaborative Squads", "👥", [
            ("Schema", "id, owner_id, name, domain, members (JSONB), synergy_score, created_at"),
            ("Trigger Rule", "BEFORE INSERT trigger verifies 1–10 members, confirms all members are accepted connections, and rejects owner self-inclusion."),
            ("Integrity", "Batches saved locally in older client versions are imported automatically upon first sign-in.")
        ]),
        ("notifications", "Trigger-Driven Feed", "🔔", [
            ("Schema", "id, user_id, actor_id, type (10 enums), title, body, link, is_read, created_at"),
            ("Security", "Direct INSERT by client/developer roles is strictly prohibited; rows are inserted solely by PostgreSQL AFTER triggers."),
            ("Preference", "Trigger inspects user_settings before creating notification; suppresses muted alerts.")
        ]),
        ("project_invitations", "Gated Assignment", "📩", [
            ("Schema", "id, project_id, developer_id, client_id, status (pending/accepted/declined/cancelled)"),
            ("Constraint", "UNIQUE(project_id, developer_id) prevents spamming; only project owner can invite."),
            ("Assignment Rule", "Client cannot assign developer until status transitions to 'accepted'.")
        ]),
        ("user_settings", "Privacy & Preferences", "⚙️", [
            ("Schema", "user_id (PK = auth.uid), in_app_notifs, email_notifs, show_on_leaderboard, theme"),
            ("Privacy", "Developers can toggle show_on_leaderboard to false, instantly hiding from public ranking."),
            ("RLS Isolation", "Users can view and update exclusively their own settings record.")
        ]),
        ("support_tickets", "Helpdesk Submissions", "🎫", [
            ("Schema", "id, ticket_number (TICK-XXXX sequence), user_id, category, subject, description, status"),
            ("CHECK Rules", "Subject must be 5–150 chars; description must be 20–5000 chars; category in allowed list."),
            ("State Flow", "Must start in 'open' status; clients cannot arbitrarily edit status once submitted.")
        ])
    ]

    # Layout 3 cards top, 2 cards bottom
    card_w = 3.65
    gap_x = 0.39
    card_h = 2.45

    coords = [
        (0.8, 1.45), (4.84, 1.45), (8.88, 1.45),
        (2.82, 4.2), (6.86, 4.2)
    ]

    for idx, (tbl_name, sub, ico, items) in enumerate(cards_info):
        lx, ly = coords[idx]
        add_card(slide, lx, ly, card_w, card_h)
        add_card_header(slide, lx + 0.15, ly + 0.12, card_w - 0.3, 0.55, tbl_name, sub, icon_txt=ico)
        
        tb = slide.shapes.add_textbox(Inches(lx + 0.15), Inches(ly + 0.72), Inches(card_w - 0.3), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        for bold_lbl, desc_txt in items:
            add_bullet(tf, bold_lbl, desc_txt, font_size=9.5)

    set_notes(slide,
        "Slide 11 delves into the precise technical schema and constraints of our five new extension tables. "
        "In team_batches, a database BEFORE trigger validates that every member is an accepted connection of the creator and limits size to 10. "
        "In notifications, client-side INSERT is completely disabled; records are written solely by database triggers responding to business events. "
        "In project_invitations, composite unique constraints prevent invitation spam, and project assignment requires the developer to accept first. "
        "In user_settings, developers are granted privacy sovereignty, allowing them to opt out of the public leaderboard. "
        "Finally, support_tickets enforces text length CHECK constraints and auto-increments public ticket identifiers."
    )

print("Slides 8 to 11 appended.")

# =============================================================
# SLIDE 12: CONNECTIONS & TEAMS (LIGHT)
# =============================================================
def slide_12_connections():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Connections & Peer Discovery Protocol", "NETWORKING WORKFLOW", 12)

    # 4-Step Horizontal Pipeline Cards
    steps = [
        ("Step 1: Multi-Facet Discovery", "Region & Skill Filtering", "🔍", 
         "Developers filter peers across Continent → Sub-region → Country, combined with specific technology tags (e.g. React, PostgreSQL, Docker) to find time-zone compatible partners."),
        ("Step 2: Request Dispatch", "Personalized Introduction", "📨", 
         "Sender transmits a connection request accompanied by an introductory pitch; row inserted with status 'pending'; database trigger instantly alerts receiver."),
        ("Step 3: Receiver Evaluation", "Accept or Decline Action", "🤝", 
         "Receiver inspects sender profile, ratings, and shared skills. Accepting transitions status to 'accepted', while declining updates status to 'rejected' gracefully."),
        ("Step 4: Realtime Unlocked", "WebSocket Chat & Teaming", "💬", 
         "Accepted status automatically activates real-time messaging thread via Supabase Realtime; receiver can now be added to collaborative Team Batches.")
    ]

    card_w = 2.75
    gap_x = 0.24
    card_h = 2.8
    top_pos = 1.45

    for idx, (title, sub, ico, desc) in enumerate(steps):
        lx = 0.8 + idx * (card_w + gap_x)
        add_card(slide, lx, top_pos, card_w, card_h)
        add_card_header(slide, lx + 0.15, top_pos + 0.15, card_w - 0.3, 0.65, title, sub, icon_txt=ico)
        
        tb = slide.shapes.add_textbox(Inches(lx + 0.15), Inches(top_pos + 0.85), Inches(card_w - 0.3), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        r = p.add_run()
        r.text = desc
        r.font.size = Pt(10)
        r.font.color.rgb = LIGHT_TEXT_MAIN

    # Bottom Split Cards: Relationship State Machine & Read Tracking RPC
    add_card(slide, 0.8, 4.45, 5.75, 2.5)
    add_card_header(slide, 0.95, 4.58, 5.45, 0.5, "Relationship State Machine", "Table 3.18 from Report", icon_txt="🔄")
    tb_sm = slide.shapes.add_textbox(Inches(0.95), Inches(5.12), Inches(5.45), Inches(1.7))
    tf_sm = tb_sm.text_frame
    tf_sm.word_wrap = True
    tf_sm.margin_left = tf_sm.margin_top = tf_sm.margin_right = tf_sm.margin_bottom = 0

    add_bullet(tf_sm, "None / Stranger", "UI offers 'Connect' button; profile skills and ratings are publicly viewable.")
    add_bullet(tf_sm, "Pending (Sent)", "UI displays 'Pending' badge; awaiting receiver confirmation; no messaging allowed.")
    add_bullet(tf_sm, "Pending (Received)", "UI displays 'Accept' and 'Decline' actions with real-time notification count.")
    add_bullet(tf_sm, "Accepted", "UI unlocks 'Message' button and allows member selection in Team Formation Engine.")

    add_card(slide, 6.78, 4.45, 5.75, 2.5)
    add_card_header(slide, 6.93, 4.58, 5.45, 0.5, "Unread Tracking via Security-Definer RPC", "Solving the RLS Read Paradox", icon_txt="📬")
    tb_rpc = slide.shapes.add_textbox(Inches(6.93), Inches(5.12), Inches(5.45), Inches(1.7))
    tf_rpc = tb_rpc.text_frame
    tf_rpc.word_wrap = True
    tf_rpc.margin_left = tf_rpc.margin_top = tf_rpc.margin_right = tf_rpc.margin_bottom = 0

    add_bullet(tf_rpc, "The Paradox", "Strict RLS permitted only message senders to UPDATE their messages, preventing receivers from marking messages as read.")
    add_bullet(tf_rpc, "The RPC Solution", "Engineered mark_messages_read(connection) as a security-definer PostgreSQL stored procedure.")
    add_bullet(tf_rpc, "Dynamic Badging", "When recipient opens a chat thread, unread counters clear instantly across the mobile bottom navigation bar and desktop header.")

    set_notes(slide,
        "Slide 12 explains our Connections and Peer Discovery protocol. "
        "Developers discover peers using our multi-tier regional filter and technical skill tags. "
        "The connection follows a four-step request-accept lifecycle similar to LinkedIn. "
        "Crucially, messaging and team formation are strictly gated by the 'accepted' status. "
        "We also solved a notable database permissions paradox: under strict RLS, users could not update someone else's message row to set is_read=true. "
        "To resolve this securely, we built the mark_messages_read security-definer function, which validates that the caller is indeed the recipient "
        "and marks messages read, dynamically clearing navigation unread counters in real time."
    )

# =============================================================
# SLIDE 13: TEAM FORMATION & SYNERGY ALGORITHM (LIGHT)
# =============================================================
def slide_13_synergy_algorithm():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Team Formation Engine & Synergy Algorithm", "ALGORITHMIC INNOVATION", 13)

    # Left: Mathematical Formulation & Rules
    add_card(slide, 0.8, 1.45, 6.2, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.9, 0.5, "Algorithm 1: Synergy Score Calculation", "Mathematical Formulation", icon_txt="🧮")
    tb_m = slide.shapes.add_textbox(Inches(0.95), Inches(2.15), Inches(5.9), Inches(4.4))
    tf_m = tb_m.text_frame
    tf_m.word_wrap = True
    tf_m.margin_left = tf_m.margin_top = tf_m.margin_right = tf_m.margin_bottom = 0

    add_bullet(tf_m, "Domain Benchmark Stack (R)", "Predefined industry requirements (e.g. Fullstack Web: React, TypeScript, Node.js, PostgreSQL, UI/UX, AWS).")
    add_bullet(tf_m, "Combined Squad Stack (S)", "Union of all selected members' verified skills: S = ∪ { skills(m) : m ∈ M }.")
    add_bullet(tf_m, "Skill Coverage Ratio", "Ratio = |Covered Skills| / |Required Benchmark Stack|.")
    add_bullet(tf_m, "Team Size Bonus", "Bonus = min(10 × |Members|, 30) — awards points for balanced team capacity.")
    add_bullet(tf_m, "Synergy Score Formula", "Score = min( round(70 × Ratio + Bonus), 100 ); if |M| = 0 then Score = 0.")
    add_bullet(tf_m, "Worked Example", "A 2-member team covering 4 of 6 skills: round(70 × 4/6 + 20) = 47 + 20 = 67%.")
    add_bullet(tf_m, "Proactive Skill Gaps Alert", "The UI flags missing skills (e.g. AWS, UI/UX Design), guiding teams to invite complementary connections before bidding.")

    # Right: Flowchart Diagram
    add_card(slide, 7.25, 1.45, 5.28, 5.3)
    add_card_header(slide, 7.4, 1.6, 4.98, 0.5, "Algorithm 1 Flowchart", "Figure 3.14 from Project Report", icon_txt="📊")
    add_image_safe(slide, IMG_SYNERGY, 7.4, 2.15, width=4.95, height=4.4)

    set_notes(slide,
        "Slide 13 details our proprietary Team Formation Engine and Algorithm 1, illustrated in Figure 3.14. "
        "When assembling a team batch, the creator selects a target project domain, such as Fullstack Web App, Mobile Engineering, or Cloud Infrastructure. "
        "The engine computes the mathematical union of all members' skills and evaluates it against the domain's recommended technology benchmark. "
        "The formula awards up to 70 points for skill coverage and up to 30 bonus points for team capacity, capped at 100%. "
        "For example, a two-developer squad covering four of six required stack technologies achieves a 67% synergy score. "
        "Crucially, the UI highlights the remaining two missing skills as skill gaps, prompting the squad to recruit a complementary peer "
        "before submitting a project proposal."
    )

# =============================================================
# SLIDE 14: PROJECT LIFECYCLE (LIGHT)
# =============================================================
def slide_14_project_lifecycle():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Project Lifecycle Management", "LIFECYCLE GOVERNANCE", 14)

    # Left: State Diagrams Image
    add_card(slide, 0.8, 1.45, 5.75, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.45, 0.5, "Project & Invitation Lifecycles", "Figure 3.11 from Project Report", icon_txt="🔄")
    add_image_safe(slide, IMG_LIFECYCLE, 0.95, 2.2, width=5.45, height=4.3)

    # Right: Lifecycle Rules & Algorithm 3
    add_card(slide, 6.78, 1.45, 5.75, 5.3)
    add_card_header(slide, 6.93, 1.6, 5.45, 0.5, "Lifecycle Rules & Algorithm 3", "Deterministic State Progression", icon_txt="📋")
    tb_r = slide.shapes.add_textbox(Inches(6.93), Inches(2.15), Inches(5.45), Inches(4.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "State 1: Open", "Created exclusively by authenticated clients; developers browse listings; client sends invitations to candidates or team batches.")
    add_bullet(tf_r, "State 2: In Progress", "Transitioned via Algorithm 3: client issues invitation → developer explicitly accepts → client confirms assignment.")
    add_bullet(tf_r, "State 3: Completed", "Client marks deliverables approved. This transition unlocks two-way rating eligibility in the database.")
    add_bullet(tf_r, "State 4: Cancelled", "Client aborts engagement prior to completion; ratings are permanently disabled to prevent review bombing.")
    add_bullet(tf_r, "Client-Only Posting Trigger", "PostgreSQL BEFORE trigger rejects any project INSERT where the author does not hold the 'client' role.")
    add_bullet(tf_r, "Anti-Circumvention Rule", "A client cannot directly assign a developer without their explicit in-app consent via accepted project invitation.")

    set_notes(slide,
        "Slide 14 explains our Project Lifecycle and Algorithm 3, depicted in Figure 3.11. "
        "In CollabriX, project progression is governed as a deterministic four-stage finite state machine: Open, In Progress, Completed, and Cancelled. "
        "To ensure developer autonomy, a client cannot unilaterally assign a project to a freelancer. "
        "Instead, Algorithm 3 enforces an invitation-gated assignment protocol: the client sends an invitation, the developer reviews and accepts it, "
        "and only then does the database permit the client to assign the project. "
        "Once marked 'Completed' by the client, the project unlocks mutual rating capabilities. "
        "If a project is cancelled, ratings are disabled permanently to prevent retaliatory negative reviews."
    )

# =============================================================
# SLIDE 15: SECURITY MODEL (LIGHT)
# =============================================================
def slide_15_security_model():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Security Model: PostgreSQL Row-Level Security", "CYBERSECURITY ARCHITECTURE", 15)

    cols = [
        ("Row-Level Security (RLS)", "Policy Enforcement on All 12 Tables", "🛡️", [
            ("Tenant Isolation", "auth.uid() = user_id filter ensures private profile settings, notifications, and batches are visible only to owners."),
            ("Role Verification", "has_role(auth.uid(), 'client') ensures developers cannot post projects or forge client invitations."),
            ("Zero Anonymous Writes", "Unauthenticated requests are strictly restricted to reading public profiles and open projects.")
        ]),
        ("Security-Definer RPCs", "Eliminating Infinite RLS Recursion", "⚡", [
            ("The Challenge", "Cross-table RLS policies evaluating user_roles or connections trigger infinite recursive query loops in PostgreSQL."),
            ("The Fix", "Security-definer helper functions execute with owner privilege while asserting caller session token."),
            ("Core Functions", "has_role(), mark_messages_read(), get_leaderboard(), and create_notification().")
        ]),
        ("Threat Mitigation Matrix", "Table 3.16 Threat Modeling", "🔒", [
            ("Privilege Escalation", "Roles stored in dedicated user_roles table rather than mutable profile columns; prevents self-promotion."),
            ("Data Snooping", "Messages and chat threads restricted to accepted connection pairs via composite RLS policies."),
            ("Review Forgery", "Rating inserts verified by checking project completed status and counterpart identity.")
        ])
    ]

    card_w = 3.65
    gap_x = 0.39
    card_h = 5.3
    top_pos = 1.45

    for idx, (title, sub, ico, items) in enumerate(cols):
        lx = 0.8 + idx * (card_w + gap_x)
        add_card(slide, lx, top_pos, card_w, card_h)
        add_card_header(slide, lx + 0.15, top_pos + 0.15, card_w - 0.3, 0.65, title, sub, icon_txt=ico)
        
        tb = slide.shapes.add_textbox(Inches(lx + 0.15), Inches(top_pos + 0.9), Inches(card_w - 0.3), Inches(4.2))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        for bold_txt, desc_txt in items:
            add_bullet(tf, bold_txt, desc_txt, font_size=10)

    set_notes(slide,
        "Slide 15 presents our database security architecture. Rather than relying on frontend checks that can be circumvented via API inspection, "
        "CollabriX anchors access control directly inside PostgreSQL using Row-Level Security on all 12 tables. "
        "To avoid infinite recursion during complex relational joins—such as checking whether a user is a client while evaluating a project policy— "
        "we engineered security-definer helper functions that execute with administrative privileges while strictly validating auth.uid(). "
        "Our threat mitigation model, detailed in Table 3.16 of the report, prevents privilege escalation by storing roles in a separate table, "
        "blocks eavesdropping on messages, and makes review forgery mathematically impossible."
    )

# =============================================================
# SLIDE 16: TWO-WAY RATINGS (LIGHT)
# =============================================================
def slide_16_ratings_integrity():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Two-Way Ratings & Reputation Integrity", "TRUST ARCHITECTURE", 16)

    # Left: Rating Flowchart Diagram
    add_card(slide, 0.8, 1.45, 5.6, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.3, 0.5, "Rating Submission & Validation", "Figure 3.15 from Project Report", icon_txt="⭐")
    add_image_safe(slide, IMG_RATING_FLOW, 0.95, 2.2, width=5.3, height=4.3)

    # Right: 5 Integrity Rules Breakdown
    add_card(slide, 6.63, 1.45, 5.9, 5.3)
    add_card_header(slide, 6.78, 1.6, 5.6, 0.5, "The 5 Pillars of Rating Integrity", "Preventing Grade Inflation & Fake Reviews", icon_txt="⚖️")
    tb_r = slide.shapes.add_textbox(Inches(6.78), Inches(2.15), Inches(5.6), Inches(4.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "1. Completion-Gated Submission", "RLS policies strictly assert projects.status = 'completed'. Ratings cannot be submitted for open or in-progress projects.")
    add_bullet(tf_r, "2. Counterpart Verification", "A client can only rate their assigned developer; a developer can only rate their project client. Third-party review insertion is blocked.")
    add_bullet(tf_r, "3. Exactly One Rating (Idempotency)", "UNIQUE(project_id, rater_id) constraints ensure neither participant can submit multiple reviews or artificially manipulate scores.")
    add_bullet(tf_r, "4. Dual-Perspective Evaluation", "Captures both Project-level satisfaction (project_ratings) and Peer/Client interpersonal feedback (user_ratings).")
    add_bullet(tf_r, "5. Immutability Guarantee", "Once submitted, ratings cannot be modified or deleted via client APIs, preventing coercive renegotiation or retaliatory score alterations.")

    set_notes(slide,
        "Slide 16 details our two-way rating system and reputation integrity rules, illustrated in Figure 3.15. "
        "To combat the pervasive rating inflation and fake reviews seen on mainstream platforms, CollabriX enforces five non-negotiable database rules. "
        "First, reviews are strictly completion-gated: if a project is not marked 'completed', all rating inserts are rejected with a permission error. "
        "Second, only the two contractual counterparts can rate each other. "
        "Third, composite unique constraints guarantee exactly one rating per participant per contract. "
        "Fourth, we separate project feedback from individual peer evaluations. "
        "And fifth, ratings are completely immutable once committed, preventing retaliatory score tampering."
    )

print("Slides 12 to 16 appended.")

# =============================================================
# SLIDE 17: NOTIFICATIONS (LIGHT)
# =============================================================
def slide_17_notifications():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Automated Event-Driven Notification Pipeline", "NOTIFICATION SYSTEM", 17)

    # Top: Pipeline Flow Diagram
    add_card(slide, 0.8, 1.45, 11.733, 2.3)
    add_card_header(slide, 0.95, 1.55, 11.4, 0.45, "Database Trigger to User Interface Pipeline", "Figure 3.16 from Project Report", icon_txt="🔔")
    add_image_safe(slide, IMG_NOTIF_PIPELINE, 0.95, 2.05, width=11.4, height=1.6)

    # Bottom Left: 10 Notification Event Types
    add_card(slide, 0.8, 3.9, 5.75, 3.1)
    add_card_header(slide, 0.95, 4.02, 5.45, 0.45, "10 Relational Event Triggers", "Table 3.21 from Project Report", icon_txt="📋")
    tb_l = slide.shapes.add_textbox(Inches(0.95), Inches(4.5), Inches(5.45), Inches(2.4))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = tf_l.margin_top = tf_l.margin_right = tf_l.margin_bottom = 0

    notifs = [
        ("Connections", "request_received, request_accepted"),
        ("Team Batches", "team_batch_added (when added to a collaborative squad)"),
        ("Invitations", "project_invite_received, invite_accepted, invite_declined"),
        ("Projects", "project_assigned, project_completed"),
        ("Reputation", "rating_received (when a counterpart submits feedback)"),
        ("Support", "ticket_status_updated (when support responds to an issue)")
    ]
    for cat, evts in notifs:
        add_bullet(tf_l, cat, evts, font_size=9.5)

    # Bottom Right: Anti-Forgery & Preferences Architecture
    add_card(slide, 6.78, 3.9, 5.75, 3.1)
    add_card_header(slide, 6.93, 4.02, 5.45, 0.45, "Zero Client Forgery & User Preferences", "Trigger-Enforced Delivery", icon_txt="🛡️")
    tb_r = slide.shapes.add_textbox(Inches(6.93), Inches(4.5), Inches(5.45), Inches(2.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "Zero-Forgery Guarantee", "Client roles cannot INSERT or UPDATE notifications directly. Rows are generated exclusively by PostgreSQL AFTER triggers upon genuine database events.")
    add_bullet(tf_r, "Preference Checking", "Trigger queries user_settings before row insertion; if in_app_notifs or specific event category is disabled, notification creation is silently suppressed.")
    add_bullet(tf_r, "Self-Trigger Filtering", "The create_notification function automatically discards actions where actor_id == user_id, preventing self-notification noise.")
    add_bullet(tf_r, "Realtime Delivery", "Supabase Realtime replicates inserts instantly over WebSockets to the header notification bell with sound and unread badge count.")

    set_notes(slide,
        "Slide 17 depicts our event-driven notification pipeline from Figure 3.16. "
        "Unlike conventional architectures where the frontend or API layer pushes notifications manually, CollabriX generates notifications "
        "exclusively via PostgreSQL AFTER triggers on our event tables. "
        "Whenever a connection is accepted, a teammate is added to a batch, or a project is assigned, our create_notification function executes. "
        "It checks the recipient's user_settings preferences, discards actions caused by the user themselves, and inserts the record. "
        "Because direct client insertion is prohibited, every notification is cryptographic proof of a verified database event. "
        "The change is broadcast over WebSockets directly to the user's header badge in sub-second time."
    )

# =============================================================
# SLIDE 18: LEADERBOARD FORMULA (LIGHT)
# =============================================================
def slide_18_leaderboard_formula():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Leaderboard Ranking: Mathematical Model", "REPUTATION MATHEMATICS", 18)

    # Left: Mathematical Formulation & Principles
    add_card(slide, 0.8, 1.45, 5.75, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.45, 0.5, "Algorithm 2: Ranking Mathematics", "Database Function get_leaderboard", icon_txt="🧮")
    tb_l = slide.shapes.add_textbox(Inches(0.95), Inches(2.15), Inches(5.45), Inches(4.4))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = tf_l.margin_top = tf_l.margin_right = tf_l.margin_bottom = 0

    add_bullet(tf_l, "Mathematical Formula", "Score(d) = 100 × C(d) + 20 × Σ Rating(r), where C(d) is verified completed projects and Rating(r) is client stars (1–5).")
    add_bullet(tf_l, "Completed 5-Star Value", "A single 5-star completed project yields: 100 + (20 × 5) = 200 Points.")
    add_bullet(tf_l, "Zero-Baseline Principle", "No synthetic 4.5 baseline ratings. Developers with zero completed projects remain unranked (Score = 0) until real work is delivered.")
    add_bullet(tf_l, "Deterministic Tie-Breaking", "When scores tie, rank resolves sequentially by: Score ↓, Average Rating ↓, Review Count n ↓, Full Name ↑, User UUID ↑.")
    add_bullet(tf_l, "Dynamic Time Filtering", "get_leaderboard(period_start) dynamically recalculates All-Time, Monthly, and Weekly rankings without stale cache anomalies.")
    add_bullet(tf_l, "Privacy Sovereignty", "Developers can toggle show_on_leaderboard in user_settings, instantly excluding themselves from public competitive rankings.")

    # Right: Algorithm Steps Breakdown
    add_card(slide, 6.78, 1.45, 5.75, 5.3)
    add_card_header(slide, 6.93, 1.6, 5.45, 0.5, "Algorithm 2 Step-by-Step Logic", "PostgreSQL Stored Procedure Execution", icon_txt="⚡")
    tb_r = slide.shapes.add_textbox(Inches(6.93), Inches(2.15), Inches(5.45), Inches(4.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "Step 1: Input Parameters", "Accepts optional timestamp t₀ for period filtering (NULL denotes all-time career scores).")
    add_bullet(tf_r, "Step 2: Candidate Selection", "Selects all profiles where role = 'developer' and user_settings.show_on_leaderboard = true.")
    add_bullet(tf_r, "Step 3: Relational Aggregation", "Counts completed projects (C) and sums client star ratings (R) completed after t₀.")
    add_bullet(tf_r, "Step 4: Score Calculation", "Executes score = 100 × C + 20 × Σ(R) and computes exact arithmetic mean rating.")
    add_bullet(tf_r, "Step 5: Eligibility Filter", "Filters candidates: candidate must have C > 0 or |R| > 0 to enter the leaderboard array.")
    add_bullet(tf_r, "Step 6: Deterministic Sort & Rank", "Sorts array by Score DESC, Avg DESC, Count DESC, Name ASC, and assigns sequential ranks 1...N.")

    set_notes(slide,
        "Slide 18 details our Leaderboard Ranking Formula, implemented as Algorithm 2 in PostgreSQL. "
        "Unlike commercial platforms that employ black-box algorithms prioritizing platform profit or ad spend, "
        "CollabriX uses a completely open, meritocratic formula executed inside the database via get_leaderboard. "
        "A developer earns 100 points for each verified completed project and 20 points per star awarded by their client. "
        "Thus, a flawless 5-star project yields exactly 200 points. "
        "We enforce a strict zero-baseline rule: newcomers do not receive arbitrary placeholder scores and only appear on the board after completing real work. "
        "Ties are broken deterministically through a multi-tier hierarchy: average rating, review count, and alphabetical name."
    )

# =============================================================
# SLIDE 19: LEADERBOARD WORKED EXAMPLE (LIGHT)
# =============================================================
def slide_19_leaderboard_worked_example():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Leaderboard in Action: Worked Example & Tiers", "EMPIRICAL DEMONSTRATION", 19)

    # Left: Worked Example Table (Table 3.19)
    t_left = Inches(0.8)
    t_top = Inches(1.45)
    t_width = Inches(7.5)
    t_height = Inches(3.6)

    rows_data = [
        ("Developer", "Completed", "Client Ratings", "Score Formula", "Avg", "Rank"),
        ("Chen", "3", "2, 2, 2", "300 + 120 = 420", "2.0", "1"),
        ("Asha", "2", "5, 5", "200 + 200 = 400", "5.0", "2"),
        ("Ben", "2", "5, 3", "200 + 160 = 360", "4.0", "3"),
        ("Dina", "1", "4", "100 + 80 = 180", "4.0", "4 (tie)"),
        ("Eli", "1", "4", "100 + 80 = 180", "4.0", "5 (tie)"),
        ("Farah", "0", "None", "0 + 0 = 0", "N/A", "Unranked")
    ]

    table_shape = slide.shapes.add_table(len(rows_data), 6, t_left, t_top, t_width, t_height)
    table = table_shape.table

    col_widths = [Inches(1.2), Inches(1.0), Inches(1.3), Inches(1.8), Inches(0.9), Inches(1.3)]
    for i, w in enumerate(col_widths):
        table.columns[i].width = w

    for r_idx, row in enumerate(rows_data):
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx, c_idx)
            cell.text = ""
            p = cell.text_frame.paragraphs[0]
            p.alignment = PP_ALIGN.CENTER if c_idx > 0 else PP_ALIGN.LEFT
            r = p.add_run()
            r.text = val
            r.font.name = "Arial"
            
            if r_idx == 0:
                cell.fill.solid()
                cell.fill.fore_color.rgb = DARK_TEAL_BG
                r.font.bold = True
                r.font.size = Pt(10.5)
                r.font.color.rgb = RGBColor(255, 255, 255)
            else:
                cell.fill.solid()
                cell.fill.fore_color.rgb = RGBColor(255, 255, 255) if r_idx % 2 == 1 else RGBColor(248, 250, 252)
                r.font.size = Pt(10)
                if c_idx == 5:
                    r.font.bold = True
                    r.font.color.rgb = LIGHT_ACCENT_TEAL
                else:
                    r.font.color.rgb = LIGHT_TEXT_MAIN

    # Left Bottom: Design Trade-off Note
    add_card(slide, 0.8, 5.25, 7.5, 1.8, bg_color=LIGHT_HIGHLIGHT_BG, border_color=LIGHT_HIGHLIGHT_BORDER)
    tb_to = slide.shapes.add_textbox(Inches(0.95), Inches(5.35), Inches(7.2), Inches(1.55))
    tf_to = tb_to.text_frame
    tf_to.word_wrap = True
    p_to = tf_to.paragraphs[0]
    r_to1 = p_to.add_run()
    r_to1.text = "DESIGN TRADE-OFF DEMONSTRATED: "
    r_to1.font.bold = True
    r_to1.font.size = Pt(10.5)
    r_to1.font.color.rgb = LIGHT_ACCENT_TEAL
    r_to2 = p_to.add_run()
    r_to2.text = "\n• Work Volume Rewarded: Chen delivered 3 projects with modest ratings (420 pts), ranking above Asha (400 pts) who completed 2 flawless projects. Real delivered work outweighs small samples."
    r_to2.font.size = Pt(10)
    r_to2.font.color.rgb = LIGHT_TEXT_MAIN
    p_to2 = tf_to.add_paragraph()
    p_to2.space_before = Pt(3)
    r_to3 = p_to2.add_run()
    r_to3.text = "• Deterministic Tie-Break: Dina & Eli match on score and ratings; Dina ranks first alphabetically."
    r_to3.font.size = Pt(10)
    r_to3.font.color.rgb = LIGHT_TEXT_MAIN

    # Right: Tiers & Achievement Badges
    add_card(slide, 8.55, 1.45, 3.98, 5.6)
    add_card_header(slide, 8.7, 1.6, 3.68, 0.5, "Tier Levels & Badges", "Gamification & Recognition", icon_txt="🏆")
    tb_bd = slide.shapes.add_textbox(Inches(8.7), Inches(2.15), Inches(3.68), Inches(4.7))
    tf_bd = tb_bd.text_frame
    tf_bd.word_wrap = True
    tf_bd.margin_left = tf_bd.margin_top = tf_bd.margin_right = tf_bd.margin_bottom = 0

    add_bullet(tf_bd, "Diamond Tier", "1000+ Points · Veteran elite contractors", font_size=9.5)
    add_bullet(tf_bd, "Gold Tier", "501–1000 Points · Proven collaborative leads", font_size=9.5)
    add_bullet(tf_bd, "Silver Tier", "201–500 Points · Consistent verified delivery", font_size=9.5)
    add_bullet(tf_bd, "Bronze Tier", "1–200 Points · First successful project delivered", font_size=9.5)
    add_bullet(tf_bd, "🎖️ Project Veteran", "Awarded upon completing 5+ verified projects", font_size=9.5)
    add_bullet(tf_bd, "⭐ 5-Star Performer", "Awarded for maintaining 4.8+ client average", font_size=9.5)
    add_bullet(tf_bd, "👥 Team Pioneer", "Awarded for forming 3+ multi-member batches", font_size=9.5)
    add_bullet(tf_bd, "⚡ Quick Responder", "Awarded for rapid response to invitations", font_size=9.5)

    set_notes(slide,
        "Slide 19 walks through Table 3.19 from our report, demonstrating the leaderboard formula in action for six sample developers. "
        "Notice the deliberate design trade-off: our formula deliberately rewards the volume of verified delivery. "
        "Chen, who delivered three projects with 2-star ratings, scores 420 points and ranks first above Asha, who has two 5-star projects totaling 400 points. "
        "This reflects commercial reality: delivering verified client work carries high value. "
        "Dina and Eli have identical completed work and ratings; the algorithm breaks the tie deterministically by alphabetical name. "
        "Farah has zero completed work, so she remains cleanly unranked rather than receiving an unearned synthetic score. "
        "On the right, developer scores unlock four tier milestones and six milestone achievement badges."
    )

# =============================================================
# SLIDE 20: SCREENSHOTS DEVELOPER WORKSPACE (LIGHT)
# =============================================================
def slide_20_screenshots_dev():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Developer Workspace & Realtime Messaging", "APPLICATION DEMONSTRATION", 20)

    # Left: Screenshot
    add_card(slide, 0.8, 1.45, 6.2, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.9, 0.5, "Developer Interface & Realtime Chat", "Figure 4.4 from Project Report", icon_txt="📱")
    add_image_safe(slide, IMG_SCREENS_DEV, 0.95, 2.15, width=5.9, height=4.4)

    # Right: Annotations & Highlights
    add_card(slide, 7.25, 1.45, 5.28, 5.3)
    add_card_header(slide, 7.4, 1.6, 4.98, 0.5, "Interface Features & Highlights", "Live Production Build Validation", icon_txt="✨")
    tb_r = slide.shapes.add_textbox(Inches(7.4), Inches(2.15), Inches(4.98), Inches(4.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "Screen (a): Developer Profile", "Displays verified technical skills, tier ranking badges, completed project counters, and authentic client rating stars derived directly from SQL joins.")
    add_bullet(tf_r, "Interactive Skill Tags", "Skills are stored as JSONB arrays, enabling instant filtering and matching across project discovery feeds.")
    add_bullet(tf_r, "Screen (b): Real-Time Chat", "One-on-one WebSocket messaging thread between accepted connections, powered by Supabase Realtime channel postgres_changes.")
    add_bullet(tf_r, "Sub-Second Message Sync", "Messages render with zero polling; instant read receipts update when recipient opens the thread.")
    add_bullet(tf_r, "Dynamic Read Badging", "Invokes security-definer function mark_messages_read, dynamically clearing unread counter badges on the navigation bar.")

    set_notes(slide,
        "Slide 20 showcases live application screenshots from Figure 4.4 of our documentation, captured from our production build. "
        "On the left, Screen (a) shows the Developer Profile view, displaying verified skills, level tier, and star ratings computed from database joins. "
        "On the right, Screen (b) demonstrates our real-time messaging interface. "
        "Chat channels are established exclusively between accepted connections. "
        "Messages are delivered instantly via Supabase Realtime WebSocket subscriptions without polling overhead. "
        "Opening the conversation automatically invokes mark_messages_read, clearing unread counters across the mobile navigation bar."
    )

# =============================================================
# SLIDE 21: SCREENSHOTS TEAM ENGINE & CLIENT (LIGHT)
# =============================================================
def slide_21_screenshots_team_client():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Team Formation Engine & Client Dashboard", "APPLICATION DEMONSTRATION", 21)

    # Left: Screenshot
    add_card(slide, 0.8, 1.45, 6.2, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.9, 0.5, "Team Engine & Client Management", "Figure 4.5 from Project Report", icon_txt="💼")
    add_image_safe(slide, IMG_SCREENS_TEAM_CLIENT, 0.95, 2.15, width=5.9, height=4.4)

    # Right: Annotations & Highlights
    add_card(slide, 7.25, 1.45, 5.28, 5.3)
    add_card_header(slide, 7.4, 1.6, 4.98, 0.5, "Interface Features & Highlights", "Live Production Build Validation", icon_txt="⚡")
    tb_r = slide.shapes.add_textbox(Inches(7.4), Inches(2.15), Inches(4.98), Inches(4.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "Screen (a): Team Engine", "Interactive squad creator showing selected members, domain selector, live 67% synergy score badge, and missing technology alerts.")
    add_bullet(tf_r, "Reactive Skill Gap Detection", "When members are added, the UI instantly highlights missing skills (e.g. AWS, UI/UX), guiding the developer to recruit complementary peers.")
    add_bullet(tf_r, "Connection-Gated Squads", "Members can only be selected from accepted connections; BEFORE triggers reject unauthorized additions.")
    add_bullet(tf_r, "Screen (b): Client Dashboard", "Dedicated workspace for clients to post new projects, review applicants, and monitor active deliverables.")
    add_bullet(tf_r, "Project Budget & Complexity", "Form validated with Zod schemas enforcing valid budget numbers and standardized complexity tiers (Easy, Medium, Hard).")

    set_notes(slide,
        "Slide 21 illustrates the Team Formation Engine and Client Dashboard from Figure 4.5. "
        "On the left, Screen (a) shows a developer constructing a Team Batch for a Fullstack Web App. "
        "As teammates are toggled, the synergy score updates reactively to 67%, and the interface flags missing technologies like AWS and UI/UX. "
        "On the right, Screen (b) displays the Client Dashboard, providing project founders with an overview of active projects, "
        "budget allocations, candidate invitations, and direct access to project creation modals."
    )

print("Slides 17 to 21 appended.")

# =============================================================
# SLIDE 22: SCREENSHOTS NOTIFICATIONS & TRACKING (LIGHT)
# =============================================================
def slide_22_screenshots_notif_proj():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Notifications & Project Tracking Interface", "APPLICATION DEMONSTRATION", 22)

    # Left: Screenshot
    add_card(slide, 0.8, 1.45, 6.2, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.9, 0.5, "Notifications & Project Assignment", "Figure 4.6 from Project Report", icon_txt="🔔")
    add_image_safe(slide, IMG_SCREENS_NOTIF_PROJ, 0.95, 2.15, width=5.9, height=4.4)

    # Right: Annotations & Highlights
    add_card(slide, 7.25, 1.45, 5.28, 5.3)
    add_card_header(slide, 7.4, 1.6, 4.98, 0.5, "Interface Features & Highlights", "Live Production Build Validation", icon_txt="📌")
    tb_r = slide.shapes.add_textbox(Inches(7.4), Inches(2.15), Inches(4.98), Inches(4.4))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "Screen (a): Notification Feed", "Unified chronological stream of trigger-generated alerts featuring actor avatars, time-ago stamps, and unread highlight dots.")
    add_bullet(tf_r, "One-Click Mark All Read", "Invokes optimistic mutation via TanStack Query, immediately clearing unread state in UI while dispatching database updates.")
    add_bullet(tf_r, "Screen (b): Project Details", "Client view of project scope, budget ($1,200), timeline, and candidate invitation tracking table.")
    add_bullet(tf_r, "Gated Assign Button", "Enforces Algorithm 3: the 'Assign' button remains disabled until the invited developer accepts the invitation in their own dashboard.")
    add_bullet(tf_r, "Role Authorization Isolation", "Developers viewing this page see a sanitized proposal view, while project owners see management controls.")

    set_notes(slide,
        "Slide 22 presents our Notifications Center and Project Tracking interface from Figure 4.6. "
        "On the left, Screen (a) shows the live Notification Feed, displaying event alerts with user avatars and relative timestamps. "
        "Clicking any notification marks it as read and navigates directly to the associated project or message thread. "
        "On the right, Screen (b) illustrates the Client Project Details view. "
        "Notice that a developer has been invited; the invitation status is tracked as 'pending', and the 'Assign' button remains disabled "
        "until the invited developer explicitly accepts, visually confirming that our database-enforced lifecycle rules are active."
    )

# =============================================================
# SLIDE 23: TEST RESULTS & QUALITY METRICS (LIGHT)
# =============================================================
def slide_23_test_results():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Test Results: 104 DB Checks & Quality Metrics", "VERIFICATION & BENCHMARKS", 23)

    # 4 Top Metric Cards
    metrics = [
        ("104 / 104", "Database Checks Passed", "100% Pass Rate across all 11 SQL migrations"),
        ("18 / 18", "UI Browser Tests Passed", "Automated Puppeteer headless Chrome test suite"),
        ("0 Errors", "TypeScript Compilation", "Strict npx tsc --noEmit against database types"),
        ("49 → 2", "ESLint Findings Reduced", "14 errors & 35 warnings resolved to 2 dev items")
    ]
    card_w = 2.75
    gap_x = 0.24
    for idx, (val, title, sub) in enumerate(metrics):
        lx = 0.8 + idx * (card_w + gap_x)
        add_card(slide, lx, 1.45, card_w, 1.25, bg_color=LIGHT_HIGHLIGHT_BG, border_color=LIGHT_HIGHLIGHT_BORDER)
        tb = slide.shapes.add_textbox(Inches(lx + 0.1), Inches(1.5), Inches(card_w - 0.2), Inches(1.15))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.alignment = PP_ALIGN.CENTER
        r1 = p1.add_run()
        r1.text = val
        r1.font.bold = True
        r1.font.size = Pt(20)
        r1.font.color.rgb = LIGHT_ACCENT_TEAL
        r1.font.name = "Arial"

        p2 = tf.add_paragraph()
        p2.alignment = PP_ALIGN.CENTER
        p2.space_before = Pt(2)
        r2 = p2.add_run()
        r2.text = title
        r2.font.bold = True
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = LIGHT_HEADER_TITLE

        p3 = tf.add_paragraph()
        p3.alignment = PP_ALIGN.CENTER
        r3 = p3.add_run()
        r3.text = sub
        r3.font.size = Pt(8.5)
        r3.font.color.rgb = LIGHT_TEXT_MUTED

    # Middle Left: Database Test Suite Breakdown (Figure 4.10)
    add_card(slide, 0.8, 2.85, 5.75, 4.35)
    add_card_header(slide, 0.95, 2.98, 5.45, 0.45, "Database Test Suite Results (104 Checks)", "Figure 4.10 from Project Report", icon_txt="🧪")
    add_image_safe(slide, IMG_CHART_DB_TESTS, 0.95, 3.48, width=5.45, height=2.3)
    tb_db = slide.shapes.add_textbox(Inches(0.95), Inches(5.85), Inches(5.45), Inches(1.25))
    tf_db = tb_db.text_frame
    tf_db.word_wrap = True
    add_bullet(tf_db, "Coverage Areas", "Connections (21/21), Team Batches (10/10), Projects (7/7), Invitations (19/19), Ratings (19/19), Notifications (9/9), Settings (4/4), Support (6/6), Leaderboard (4/4), Anonymous (4/4), Sign-up (1/1).", font_size=8.5)

    # Middle Right: Lighthouse Performance & Bundle Size (Figure 4.9)
    add_card(slide, 6.78, 2.85, 5.75, 4.35)
    add_card_header(slide, 6.93, 2.98, 5.45, 0.45, "Google Lighthouse Mobile Audit Scores", "Figure 4.9 from Project Report", icon_txt="🚀")
    add_image_safe(slide, IMG_CHART_LIGHTHOUSE, 6.93, 3.48, width=5.45, height=2.3)
    tb_lh = slide.shapes.add_textbox(Inches(6.93), Inches(5.85), Inches(5.45), Inches(1.25))
    tf_lh = tb_lh.text_frame
    tf_lh.word_wrap = True
    add_bullet(tf_lh, "Lighthouse Scores", "Performance: 76 · Accessibility: 84 · Best Practices: 100 · SEO: 100. Audited with Lighthouse 12 on mobile emulation (simulated slow 4G, CPU throttling). Compressed bundle: 411 KB.", font_size=8.5)

    set_notes(slide,
        "Slide 23 delivers our empirical quality assurance and verification benchmarks, validating the reliability of CollabriX. "
        "First, we built an automated Python test suite that executed all 104 database integrity checks against PostgreSQL 16. "
        "As shown in Figure 4.10, every single check passed—validating connections, team batch constraints, invitation gating, "
        "completion-gated ratings, and anonymous RLS restrictions. "
        "Second, 18 automated Puppeteer browser tests verified authentication, form validation, and navigation flows. "
        "Third, our codebase compiles with zero TypeScript errors, and we reduced ESLint findings from 49 down to just 2 minor development warnings. "
        "Finally, an independent Google Lighthouse mobile audit awarded CollabriX perfect 100/100 scores in Best Practices and SEO, "
        "with 84 in Accessibility and 76 in Performance on a 411 KB bundle."
    )

# =============================================================
# SLIDE 24: LIMITATIONS & FUTURE WORK (LIGHT)
# =============================================================
def slide_24_limitations_future():
    slide = prs.slides.add_slide(BLANK)
    add_light_header(slide, "Limitations & Future Work", "ROADMAP & EXTENSIBILITY", 24)

    # Left Column: Current Limitations
    add_card(slide, 0.8, 1.45, 5.75, 5.3)
    add_card_header(slide, 0.95, 1.6, 5.45, 0.55, "Current Prototype Boundaries", "Table 5.2 from Project Report", icon_txt="⚠️")
    tb_l = slide.shapes.add_textbox(Inches(0.95), Inches(2.2), Inches(5.45), Inches(4.3))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = tf_l.margin_top = tf_l.margin_right = tf_l.margin_bottom = 0

    add_bullet(tf_l, "Curated Job Listings", "Projects currently originate from verified on-platform postings rather than automated external job scraping APIs.")
    add_bullet(tf_l, "Relational Filter Matching", "Developer and project search uses SQL .ilike() and .contains() filters rather than semantic AI vector embeddings.")
    add_bullet(tf_l, "Text-Only Messaging", "Real-time chat supports text communication; multimedia attachments, voice notes, and video calling are not yet integrated.")
    add_bullet(tf_l, "Simulated Financial Escrow", "Payments are simulated through contract states without live Stripe escrow milestone disbursements in this academic phase.")
    add_bullet(tf_l, "In-App Notifications Only", "Notifications are currently displayed in-app; external transactional email and SMS dispatchers remain unconfigured.")

    # Right Column: Future Roadmap
    add_card(slide, 6.78, 1.45, 5.75, 5.3)
    add_card_header(slide, 6.93, 1.6, 5.45, 0.55, "Planned Future Enhancements", "Strategic Evolution Roadmap", icon_txt="🔮")
    tb_r = slide.shapes.add_textbox(Inches(6.93), Inches(2.2), Inches(5.45), Inches(4.3))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0

    add_bullet(tf_r, "AI-Powered Team Matching", "Deploy embedding models to recommend complementary teammates based on GitHub commit histories and project domains.")
    add_bullet(tf_r, "Automated GitHub Verification", "OAuth integration with GitHub API to verify developer repositories, languages, and technical pull requests automatically.")
    add_bullet(tf_r, "WebRTC Audio & Video Conferencing", "Native peer-to-peer video calling for sprint standups, project kickoff meetings, and client interviews.")
    add_bullet(tf_r, "Stripe Milestone Escrow", "Smart financial escrow contracts releasing payments automatically upon client milestone sign-off.")
    add_bullet(tf_r, "React Native Mobile App", "Cross-platform mobile application compiled for iOS and Android with background push notifications.")

    set_notes(slide,
        "Slide 24 provides an honest appraisal of our current prototype limitations alongside our future development roadmap. "
        "Presently, job postings are curated, search uses relational filters rather than semantic embeddings, chat is text-only, "
        "and payment escrow is simulated through project lifecycle states. "
        "In our future roadmap, we plan to implement AI-driven team recommendations using vector similarity over GitHub profiles, "
        "integrate automated GitHub repository verification, embed WebRTC for native video standups, "
        "implement Stripe escrow payments with milestone disbursements, and build a native React Native application for mobile push notifications."
    )

# =============================================================
# SLIDE 25: CONCLUSION & Q&A (DARK TEAL)
# =============================================================
def slide_25_conclusion_qa():
    slide = prs.slides.add_slide(BLANK)
    add_full_bg(slide, DARK_TEAL_BG)

    # Accent decorative glow bar
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.6), Inches(11.733), Inches(0.06))
    bar.fill.solid()
    bar.fill.fore_color.rgb = DARK_TEAL_BORDER
    bar.line.color.rgb = DARK_TEAL_BORDER

    # Header Badge
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(4.5), Inches(0.35))
    badge.fill.solid()
    badge.fill.fore_color.rgb = DARK_TEAL_BADGE_BG
    badge.line.color.rgb = DARK_TEAL_BORDER
    badge.line.width = Pt(1)
    tf_b = badge.text_frame
    tf_b.margin_left = tf_b.margin_top = tf_b.margin_right = tf_b.margin_bottom = 0
    p_b = tf_b.paragraphs[0]
    p_b.alignment = PP_ALIGN.CENTER
    r_b = p_b.add_run()
    r_b.text = "PROJECT SUMMARY & OPEN FLOOR"
    r_b.font.bold = True
    r_b.font.size = Pt(10)
    r_b.font.color.rgb = DARK_TEAL_BADGE_TXT

    # Main Conclusion Title
    tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(1.25), Inches(11.7), Inches(1.1))
    tf_t = tb_title.text_frame
    tf_t.word_wrap = True
    tf_t.margin_left = tf_t.margin_top = tf_t.margin_right = tf_t.margin_bottom = 0
    p_t = tf_t.paragraphs[0]
    r_t = p_t.add_run()
    r_t.text = "Conclusion & Discussion"
    r_t.font.bold = True
    r_t.font.size = Pt(36)
    r_t.font.color.rgb = DARK_TEAL_TITLE
    r_t.font.name = "Arial"

    p_sub = tf_t.add_paragraph()
    p_sub.space_before = Pt(3)
    r_sub = p_sub.add_run()
    r_sub.text = "CollabriX: Proving the Power of Team-First Freelance Collaboration"
    r_sub.font.bold = True
    r_sub.font.size = Pt(16)
    r_sub.font.color.rgb = DARK_TEAL_SUB

    # Left Column: Key Achievements
    add_card(slide, 0.8, 2.45, 5.75, 3.5, bg_color=DARK_TEAL_CARD, border_color=DARK_TEAL_BORDER, border_width=1)
    tb_ach = slide.shapes.add_textbox(Inches(0.95), Inches(2.6), Inches(5.45), Inches(3.2))
    tf_ach = tb_ach.text_frame
    tf_ach.word_wrap = True
    tf_ach.margin_left = tf_ach.margin_top = tf_ach.margin_right = tf_ach.margin_bottom = 0
    p_ach_h = tf_ach.paragraphs[0]
    r_ach_h = p_ach_h.add_run()
    r_ach_h.text = "KEY RESEARCH & ENGINEERING ACCOMPLISHMENTS"
    r_ach_h.font.bold = True
    r_ach_h.font.size = Pt(11)
    r_ach_h.font.color.rgb = DARK_TEAL_BADGE_TXT

    achievements = [
        ("Team-First Shift", "Transformed freelance software delivery from isolated solo bidding to collaborative squad teaming."),
        ("Relational Integrity", "PostgreSQL Row-Level Security on all 12 tables prevents review fraud, state forgery, and unauthorized writes."),
        ("Algorithmic Synergy", "Algorithm 1 matches team capacity against domain standards, proactively alerting squads to skill gaps."),
        ("Verified Reputation", "Algorithm 2 computes open meritocratic leaderboard rankings exclusively from completed client deliveries.")
    ]
    for bold_txt, desc_txt in achievements:
        add_bullet(tf_ach, bold_txt, desc_txt, font_size=10, prefix_color=DARK_TEAL_MUTED, text_color=DARK_TEAL_TITLE)

    # Right Column: Acknowledgements & Q&A
    add_card(slide, 6.78, 2.45, 5.75, 3.5, bg_color=DARK_TEAL_CARD, border_color=DARK_TEAL_BORDER, border_width=1)
    tb_ack = slide.shapes.add_textbox(Inches(6.93), Inches(2.6), Inches(5.45), Inches(3.2))
    tf_ack = tb_ack.text_frame
    tf_ack.word_wrap = True
    tf_ack.margin_left = tf_ack.margin_top = tf_ack.margin_right = tf_ack.margin_bottom = 0
    p_ack_h = tf_ack.paragraphs[0]
    r_ack_h = p_ack_h.add_run()
    r_ack_h.text = "SPECIAL ACKNOWLEDGEMENTS"
    r_ack_h.font.bold = True
    r_ack_h.font.size = Pt(11)
    r_ack_h.font.color.rgb = DARK_TEAL_BADGE_TXT

    acks = [
        ("Project Guide", "Assistant Prof. Barkha Makwana for invaluable mentorship, architectural feedback, and rigorous evaluation."),
        ("Academic Institution", "Department of Computer Science & Engineering, Parul Institute of Engineering & Technology, Parul University."),
        ("Peer Community", "Fellow student developers whose collaboration workflows shaped our user personas and requirements.")
    ]
    for bold_txt, desc_txt in acks:
        add_bullet(tf_ack, bold_txt, desc_txt, font_size=10, prefix_color=DARK_TEAL_MUTED, text_color=DARK_TEAL_TITLE)

    # Bottom Banner: Thank you / Questions
    add_card(slide, 0.8, 6.15, 11.733, 0.95, bg_color=DARK_TEAL_CARD, border_color=DARK_TEAL_BORDER, border_width=1.5)
    tb_qa = slide.shapes.add_textbox(Inches(1.0), Inches(6.25), Inches(11.3), Inches(0.75))
    tf_qa = tb_qa.text_frame
    tf_qa.word_wrap = True
    p_qa = tf_qa.paragraphs[0]
    p_qa.alignment = PP_ALIGN.CENTER
    r_qa = p_qa.add_run()
    r_qa.text = "THANK YOU! QUESTIONS & DISCUSSION WELCOME"
    r_qa.font.bold = True
    r_qa.font.size = Pt(18)
    r_qa.font.color.rgb = DARK_TEAL_SUB
    r_qa.font.name = "Arial"

    set_notes(slide,
        "In conclusion, CollabriX successfully proves that transitioning freelance marketplaces from solitary bidding queues "
        "to an architectural team-first paradigm empowers developers to deliver complex software while guaranteeing fair, verified reputation tracking. "
        "By enforcing business governance directly in PostgreSQL through Row-Level Security and stored procedures, "
        "we have built a platform that is secure by design and verified by 104 passing database tests and top Lighthouse scores. "
        "We express our sincere gratitude to our project guide, Assistant Professor Barkha Makwana, and the Department of "
        "Computer Science and Engineering at Parul University for their continuous encouragement and technical guidance. "
        "Thank you for your attention, and we are now pleased to open the floor to your questions and discussion."
    )

# =============================================================
# MAIN BUILDER EXECUTION
# =============================================================
def main():
    print("Generating Slide 1: Cover...")
    slide_01_cover()
    print("Generating Slide 2: Agenda...")
    slide_02_agenda()
    print("Generating Slide 3: Problem...")
    slide_03_problem()
    print("Generating Slide 4: Solution...")
    slide_04_solution()
    print("Generating Slide 5: Objectives...")
    slide_05_objectives()
    print("Generating Slide 6: Literature Survey...")
    slide_06_literature()
    print("Generating Slide 7: Comparison Table...")
    slide_07_comparison()
    print("Generating Slide 8: Technology Stack...")
    slide_08_tech_stack()
    print("Generating Slide 9: Architecture...")
    slide_09_architecture()
    print("Generating Slide 10: Database 12 Tables...")
    slide_10_database_overview()
    print("Generating Slide 11: 5 New Tables...")
    slide_11_five_new_tables()
    print("Generating Slide 12: Connections...")
    slide_12_connections()
    print("Generating Slide 13: Synergy Algorithm...")
    slide_13_synergy_algorithm()
    print("Generating Slide 14: Project Lifecycle...")
    slide_14_project_lifecycle()
    print("Generating Slide 15: Security Model...")
    slide_15_security_model()
    print("Generating Slide 16: Two-Way Ratings...")
    slide_16_ratings_integrity()
    print("Generating Slide 17: Notifications Pipeline...")
    slide_17_notifications()
    print("Generating Slide 18: Leaderboard Formula...")
    slide_18_leaderboard_formula()
    print("Generating Slide 19: Leaderboard Worked Example...")
    slide_19_leaderboard_worked_example()
    print("Generating Slide 20: Screenshots Dev...")
    slide_20_screenshots_dev()
    print("Generating Slide 21: Screenshots Team & Client...")
    slide_21_screenshots_team_client()
    print("Generating Slide 22: Screenshots Notifications & Tracking...")
    slide_22_screenshots_notif_proj()
    print("Generating Slide 23: Test Results...")
    slide_23_test_results()
    print("Generating Slide 24: Limitations & Future Work...")
    slide_24_limitations_future()
    print("Generating Slide 25: Conclusion & Q&A...")
    slide_25_conclusion_qa()

    output_path = "CollabriX_Presentation.pptx"
    prs.save(output_path)
    print(f"SUCCESS: Presentation successfully generated at '{output_path}' with {len(prs.slides)} slides!")

if __name__ == "__main__":
    main()
