# 寒假计划安排 H5 应用

一个用于高中生寒假计划管理的手机H5应用，支持添加任务、完成任务、烟花庆祝等功能。

## 功能特点

- ✅ 添加新任务
- ✅ 完成任务（触发烟花庆祝效果）
- ✅ 删除任务
- ✅ 恢复已完成任务
- 📱 移动端响应式设计
- ☁️ 使用Firebase免费数据库存储
- 🎉 任务完成时的烟花动画效果

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Firebase Realtime Database

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/winter-plan.git
cd winter-plan
```

### 2. 配置Firebase

1. 访问 [Firebase控制台](https://console.firebase.google.com/)
2. 创建一个新的Firebase项目
3. 在项目设置中找到"Web应用"部分，添加一个新的Web应用
4. 复制生成的Firebase配置代码
5. 打开 `script.js` 文件，将配置代码替换到对应的位置

### 3. 启用Firebase Realtime Database

1. 在Firebase控制台中，导航到"Realtime Database"
2. 创建一个新的数据库
3. 在规则标签页中，将规则设置为：

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

> ⚠️ 注意：这种规则允许任何人读写数据库，仅用于开发和学习目的。

### 4. 部署到GitHub Pages

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