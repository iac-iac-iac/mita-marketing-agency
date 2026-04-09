-- =============================================================================
-- М.И.Т.А. CMS — Схема базы данных SQLite
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Блог
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'М.И.Т.А.',
    category TEXT NOT NULL DEFAULT 'Общее',
    tags TEXT NOT NULL DEFAULT '[]',  -- JSON массив: ["тег1", "тег2"]
    cover_image TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
    read_time INTEGER NOT NULL DEFAULT 5,
    published_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- -----------------------------------------------------------------------------
-- Кейсы
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL,
    client TEXT NOT NULL DEFAULT '',
    industry TEXT NOT NULL DEFAULT '',
    cover_image TEXT NOT NULL DEFAULT '',
    gallery TEXT NOT NULL DEFAULT '[]',  -- JSON массив URL
    stats TEXT NOT NULL DEFAULT '[]',    -- JSON массив: [{label, before, after, improvement, icon}]
    tools TEXT NOT NULL DEFAULT '[]',    -- JSON массив
    challenges TEXT NOT NULL DEFAULT '[]',
    solutions TEXT NOT NULL DEFAULT '[]',
    results TEXT NOT NULL DEFAULT '',
    testimonial TEXT NOT NULL DEFAULT '{}',  -- JSON: {text, author, position, company, avatar}
    status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
    published_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_cases_slug ON cases(slug);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_published_at ON cases(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_industry ON cases(industry);

-- -----------------------------------------------------------------------------
-- Лиды (заявки из форм)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_name TEXT NOT NULL DEFAULT 'contact_form',
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    service TEXT NOT NULL DEFAULT '',
    utm_source TEXT DEFAULT '',
    utm_medium TEXT DEFAULT '',
    utm_campaign TEXT DEFAULT '',
    utm_content TEXT DEFAULT '',
    utm_term TEXT DEFAULT '',
    bitrix_id INTEGER DEFAULT NULL,  -- ID лида в Bitrix24
    status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'qualified', 'lost', 'won')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- -----------------------------------------------------------------------------
-- Отзывы
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    quote TEXT NOT NULL,
    avatar TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT '',  -- '' = главная, 'leadgen', 'call-center', 'avito', 'recruiting'
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_testimonials_sort ON testimonials(sort_order);
