from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = Path("output/pdf/joabe-santos-resume.pdf")
BLUE = colors.HexColor("#1F4E79")
TEXT = colors.HexColor("#111111")
MUTED = colors.HexColor("#444444")


def link(label: str, url: str) -> str:
    return f'<link href="{url}" color="#0563C1"><u>{label}</u></link>'


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="ResumeName", parent=styles["Title"], fontName="Helvetica-Bold",
    fontSize=17, leading=20, textColor=BLUE, alignment=TA_CENTER, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="ResumeTagline", parent=styles["Normal"], fontName="Helvetica",
    fontSize=10.5, leading=13, textColor=MUTED, alignment=TA_CENTER, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="ResumeContact", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.5, leading=12, textColor=TEXT, alignment=TA_CENTER, spaceAfter=9,
))
styles.add(ParagraphStyle(
    name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold",
    fontSize=11.5, leading=14, textColor=BLUE, spaceBefore=7, spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Body", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.45, leading=12.2, textColor=TEXT, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="BulletResume", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.25, leading=11.7, textColor=TEXT, leftIndent=17, firstLineIndent=-9,
    bulletIndent=5, spaceAfter=2.5,
))
styles.add(ParagraphStyle(
    name="Role", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.55, leading=12, textColor=TEXT,
))
styles.add(ParagraphStyle(
    name="Date", parent=styles["BodyText"], fontName="Helvetica-Oblique",
    fontSize=8.6, leading=11, textColor=TEXT, alignment=2,
))
styles.add(ParagraphStyle(
    name="Education", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.35, leading=11.8, textColor=TEXT, spaceAfter=4,
))


def section(title: str):
    return [
        Paragraph(title, styles["Section"]),
        HRFlowable(width="100%", thickness=0.8, color=BLUE, spaceBefore=0, spaceAfter=5),
    ]


def bullets(items):
    return [Paragraph(item, styles["BulletResume"], bulletText="•") for item in items]


def role(title: str, company: str, dates: str):
    table = Table(
        [[Paragraph(f"<b>{title}</b> | {company}", styles["Role"]), Paragraph(dates, styles["Date"])]],
        colWidths=[5.95 * inch, 1.35 * inch],
        hAlign="LEFT",
    )
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return table


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(colors.HexColor("#666666"))
    canvas.drawCentredString(letter[0] / 2, 0.28 * inch, f"Joabe Santos | Page {doc.page}")
    canvas.restoreState()


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUTPUT), pagesize=letter,
        leftMargin=0.55 * inch, rightMargin=0.55 * inch,
        topMargin=0.48 * inch, bottomMargin=0.45 * inch,
        title="Joabe Santos - Resume",
        author="Joabe Santos",
        subject="Decision Science and Analytics Engineering",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="resume")
    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=footer)])

    story = [
        Paragraph("JOABE BENCAO ROCHA SANTOS", styles["ResumeName"]),
        Paragraph("Decision Scientist | Analytics Engineering", styles["ResumeTagline"]),
        Paragraph(
            "Sao Paulo, Brazil &nbsp; | &nbsp; "
            + link("jbencao37@gmail.com", "mailto:jbencao37@gmail.com")
            + " &nbsp; | &nbsp; " + link("LinkedIn", "https://www.linkedin.com/in/joabe-santos")
            + " &nbsp; | &nbsp; " + link("GitHub", "https://github.com/J0BS013")
            + " &nbsp; | &nbsp; US Visa: B1/B2 (Valid)",
            styles["ResumeContact"],
        ),
    ]

    story += section("PROFESSIONAL SUMMARY")
    story += [
        Paragraph(
            "Data and technology professional with 7+ years of experience, including 4+ years across analytics, "
            "business intelligence and analytics engineering. Connects business needs, data and technology to build "
            "reliable analytical products, measurement frameworks and decision-ready insights for global teams.",
            styles["Body"],
        ),
        Paragraph(
            "Combines Python, SQL, PySpark, dbt, Databricks, Snowflake and Power BI with hands-on work in A/B testing, "
            "time-series analysis and customer segmentation. Comfortable owning the path from an ambiguous question "
            "to metric definition, data model and executive recommendation.",
            styles["Body"],
        ),
        Paragraph("Specialization in Applied Statistics. Fluent English with active US B1/B2 visa.", styles["Body"]),
    ]

    story += section("SELECTED ACHIEVEMENTS")
    story += bullets([
        "Progressed from Junior Data Analyst to Data Analyst at AB InBev BEES in just over two years, taking ownership of increasingly complex technical and business deliverables.",
        "Designed data models, pipelines, KPIs and dashboards supporting BEES marketplace operations across Latin America and global markets.",
        "Currently delivers analytics engineering for a global insurance client through Capgemini, collaborating daily with US-based product and business teams.",
        "Combines a technology background with postgraduate study in Applied Statistics to structure experiments, analytical products and decision systems.",
    ])

    story += section("PROFESSIONAL EXPERIENCE")
    story += [role(
        "Associate Decision Scientist",
        "Capgemini - Global insurance client (US)",
        "Sep 2025 - Present",
    )]
    story += bullets([
        "Designs end-to-end analytical datasets and pipelines for executive reporting, product analysis and machine-learning use cases.",
        "Builds Snowflake data models and curated layers with dbt, supporting dashboards and analyses used by product and operations teams.",
        "Implements tests, freshness checks and documentation to improve the quality and reliability of analytical data.",
        "Translates business needs into requirements, KPIs, A/B tests and observational studies in daily collaboration with international teams.",
    ])

    story += [role(
        "Data Analyst, BI & Analytics Engineering",
        "AB InBev - AMBEV / BEES Global",
        "Nov 2024 - Sep 2025",
    )]
    story += bullets([
        "Led the design and optimization of Databricks and PySpark ETL pipelines for BEES marketplace operations across global markets.",
        "Developed data models, KPI frameworks and Power BI executive dashboards for commercial performance, investment and customer segmentation decisions.",
        "Performed customer segmentation, behavioral clustering and time-series analyses supporting growth initiatives across Latin America.",
        "Conducted code reviews and supported junior analysts with SQL, dbt modeling and dashboard standards.",
    ])

    story += [role(
        "Junior Data Analyst",
        "AB InBev - AMBEV / BEES Global",
        "Jul 2022 - Nov 2024",
    )]
    story += bullets([
        "Automated reporting workflows and improved dashboard efficiency, reducing manual work across analytics operations.",
        "Supported KPI tracking and business analysis for commercial and operational decisions.",
        "Contributed to analytical infrastructure improvements during the strategic transition to the BEES platform.",
    ])

    story += [KeepTogether([
        role("Junior Data Analyst", "Bluma - Singu / Natura Group", "Feb 2022 - Jul 2022"),
        *bullets([
            "Built marketing funnels and KPI dashboards to improve visibility into customer acquisition and retention.",
            "Analyzed product and marketing data with SQL and MongoDB to support growth and go-to-market decisions.",
        ]),
    ])]

    story += [KeepTogether([
        role("Network & Support Analyst", "76 Telecom / Upix Networks", "May 2019 - Feb 2022"),
        *bullets([
            "Diagnosed and resolved connectivity incidents across technical support and network operations, guiding users and customers through resolution.",
            "Logged and tracked technical tickets, structuring issue information to improve communication and accelerate problem solving.",
        ]),
    ])]

    story += section("CORE COMPETENCIES")
    story += bullets([
        "<b>Analytics Engineering:</b> SQL, Python, PySpark, dbt, data modeling, ETL/ELT, data quality, layered architecture and data warehousing",
        "<b>Data Platforms:</b> Snowflake, Databricks, Azure Data Lake, Azure SQL, MongoDB, AWS, Git and GitHub",
        "<b>Business Intelligence:</b> Power BI, DAX, semantic modeling, dashboard design, KPI definition and data visualization",
        "<b>Decision Science & Statistics:</b> A/B testing, experiment design, time-series analysis, RFM segmentation, clustering and applied statistics",
        "<b>Business & Communication:</b> requirements gathering, process analysis, cross-functional collaboration and executive communication with global teams",
    ])

    story += section("EDUCATION")
    story += [
        Paragraph("<b>Specialization in Applied Statistics</b> | Ampli | 2022 - 2023", styles["Education"]),
        Paragraph("<b>B.S. in Systems Analysis and Development</b> | FATEC Sao Paulo | 2019 - 2021", styles["Education"]),
        Paragraph("<b>Technical Degree in Informatics</b> | ETEC | 2016 - 2017", styles["Education"]),
    ]

    story += section("LANGUAGES")
    story += [Paragraph("<b>Portuguese</b> (Native) &nbsp; • &nbsp; <b>English</b> (Fluent - daily use with US teams) &nbsp; • &nbsp; <b>Spanish</b> (Intermediate)", styles["Body"])]

    doc.build(story)


if __name__ == "__main__":
    build()
