-- 毛茸茸宠物洗护馆 — 预约表
-- 写入路径:Contact.tsx → POST /api/appointments → postgres.js → Supabase Session Pool
-- 字段来源:Contact 表单 4 项(name / phone / pet_type / message)

create table if not exists public.appointments (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null check (char_length(name) between 1 and 50),
  phone       text        not null check (char_length(phone) between 1 and 20),
  pet_type    text                 check (pet_type is null or char_length(pet_type) <= 50),
  message     text                 check (message  is null or char_length(message)  <= 2000),
  created_at  timestamptz not null default now()
);

comment on table  public.appointments           is ''毛茸茸宠物洗护馆预约记录'';
comment on column public.appointments.name      is ''用户姓名'';
comment on column public.appointments.phone     is ''联系电话'';
comment on column public.appointments.pet_type  is ''宠物类型(自由文本,例如:金毛/布偶猫/泰迪)'';
comment on column public.appointments.message   is ''预约留言'';
comment on column public.appointments.created_at is ''提交时间(UTC,业务侧用 now() 即可)'';

create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

create index if not exists appointments_phone_idx
  on public.appointments (phone);
