# Tiamo AI Portfolio

这是一个可直接部署到 GitHub Pages 的中文 AI 作品集网站，包含：

1. Starbucks AI Marketing Video
2. 香港大学课程宣传视频
3. AI Maze Game

## 一、把文件上传到 GitHub

建议新建一个仓库，仓库名填写：

```text
Tiamo666Tan.github.io
```

必须与 GitHub 用户名一致。然后将本文件夹中的所有内容上传到仓库根目录。

目录结构应保持为：

```text
Tiamo666Tan.github.io/
├── index.html
├── style.css
└── assets/
    ├── images/
    │   ├── starbucks-cover.svg
    │   └── hku-cover.svg
    └── videos/
        ├── starbucks-ai-video.mp4
        └── hku-course-promo.mp4
```

## 二、放入两个视频

将 Starbucks 视频改名为：

```text
starbucks-ai-video.mp4
```

将 HKU 课程宣传视频改名为：

```text
hku-course-promo.mp4
```

然后把两个文件放进：

```text
assets/videos/
```

注意：GitHub 网页端单个文件通常不适合上传很大的视频。如果视频过大，建议先压缩至 100MB 以下；更大的视频建议上传至腾讯云 COS、阿里云 OSS、Vimeo 或 YouTube，再修改 HTML 中的视频地址。

## 三、开启 GitHub Pages

进入仓库后：

1. 点击 `Settings`
2. 左侧点击 `Pages`
3. `Source` 选择 `Deploy from a branch`
4. `Branch` 选择 `main`
5. 文件夹选择 `/root`
6. 点击 `Save`

几分钟后访问：

```text
https://tiamo666tan.github.io
```

## 四、修改文字

网站的所有文字都在 `index.html` 里。点击该文件右上角铅笔图标即可在线修改。

## 五、当前链接

游戏项目链接已经设置为：

```text
https://github.com/Tiamo666Tan/AI-Maze-Game
```
