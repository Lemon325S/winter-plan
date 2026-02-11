# 寒假计划安排 H5 应用

一个用于高中生寒假计划管理的手机H5应用，支持添加任务、完成任务、烟花庆祝等功能。

## 功能特点

- ✅ 添加新任务
- ✅ 完成任务（触发烟花庆祝效果）
- ✅ 删除任务
- ✅ 恢复已完成任务
- 📱 移动端响应式设计
- ☁️ 使用Supabase免费数据库存储
- 🎉 任务完成时的烟花动画效果

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Supabase Realtime Database

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/winter-plan.git
cd winter-plan
```

### 2. 配置Supabase

1. 访问 [Supabase控制台](https://app.supabase.com/)
2. 创建一个新的Supabase项目
3. 在项目设置中找到"API"部分，复制"Project URL"和"Anon Key"
4. 打开 `script.js` 文件，将这些值替换到对应的位置

### 3. 创建Supabase数据库表

1. 在Supabase控制台中，导航到"Database" > "Tables"
2. 点击"New table"创建一个新表
3. 表名设置为 `tasks`
4. 添加以下字段：
   - `id`：类型为 `uuid`，默认值为 `gen_random_uuid()`，设为主键
   - `text`：类型为 `text`，必填
   - `completed`：类型为 `boolean`，默认值为 `false`
   - `created_at`：类型为 `timestamp with time zone`，默认值为 `now()`
5. 点击"Save"保存表结构

### 4. 设置Supabase访问权限

1. 在Supabase控制台中，导航到"Authentication" > "Policies"
2. 为 `tasks` 表添加以下策略：
   - 允许所有人读取：`CREATE POLICY "Allow public read" ON "public"."tasks" FOR SELECT USING (true)`
   - 允许所有人写入：`CREATE POLICY "Allow public write" ON "public"."tasks" FOR ALL USING (true)`

> ⚠️ 注意：这种权限设置允许任何人读写数据库，仅用于开发和学习目的。

### 5. 部署到GitHub Pages

1. 将项目推送到你的GitHub仓库
2. 在仓库设置中，导航到"Pages"部分
3. 选择"main"分支作为源分支
4. 点击"Save"按钮
5. 等待几分钟，GitHub会为你生成一个访问URL

## 本地开发

在本地打开 `index.html` 文件即可预览应用效果。

## 项目结构

```
winter-plan/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 主要逻辑
├── fireworks.js        # 烟花效果
└── README.md           # 项目说明
```

## 使用指南

1. 在输入框中输入任务内容
2. 点击"添加任务"按钮或按Enter键添加任务
3. 点击"完成"按钮标记任务为已完成（会触发烟花效果）
4. 点击"删除"按钮删除任务
5. 点击"恢复"按钮将已完成任务恢复为待完成状态

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 致谢

- 感谢Firebase提供免费的实时数据库服务
- 感谢所有使用和支持这个项目的用户！

---

**祝大家度过一个充实而有意义的寒假！** 🎉