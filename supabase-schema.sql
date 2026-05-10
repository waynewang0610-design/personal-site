-- 在 Supabase 后台的 SQL Editor 中运行此文件

-- 1. 动态表
CREATE TABLE IF NOT EXISTS updates (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  date TEXT NOT NULL,
  content TEXT NOT NULL
);

-- 2. 留言表
CREATE TABLE IF NOT EXISTS guestbook_messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  content TEXT NOT NULL
);

-- 3. 开启 RLS
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook_messages ENABLE ROW LEVEL SECURITY;

-- 4. RLS 策略：任何人都可以查看
CREATE POLICY "updates_public_read" ON updates
  FOR SELECT USING (true);

CREATE POLICY "guestbook_public_read" ON guestbook_messages
  FOR SELECT USING (true);

-- 5. RLS 策略：任何人都可以留言
CREATE POLICY "guestbook_public_insert" ON guestbook_messages
  FOR INSERT WITH CHECK (true);

-- 6. RLS 策略：只有登录用户（管理员）可以修改动态
CREATE POLICY "updates_auth_write" ON updates
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "updates_auth_update" ON updates
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "updates_auth_delete" ON updates
  FOR DELETE USING (auth.role() = 'authenticated');

-- 7. 回复表（同时关联动态和留言）
CREATE TABLE IF NOT EXISTS replies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  parent_type TEXT NOT NULL,
  parent_id BIGINT NOT NULL,
  name TEXT NOT NULL,
  content TEXT NOT NULL
);

-- 8. 回复表 RLS
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "replies_public_read" ON replies
  FOR SELECT USING (true);

CREATE POLICY "replies_public_insert" ON replies
  FOR INSERT WITH CHECK (true);

CREATE POLICY "replies_auth_delete" ON replies
  FOR DELETE USING (auth.role() = 'authenticated');
