import fs from "node:fs";
import path from "node:path";
import parseFrontmatter from "gray-matter";

const excludedFiles = [
  "index.md",
  "tags.md",
  "archives.md",
  "me.md",
  "animations.md",
];

export default {
  watch: ["./docs/**/*.md"],
  load(watchedFiles) {
    // 排除不必要文件
    const articleFiles = watchedFiles.filter((file) => {
      const filename = path.basename(file);
      return !excludedFiles.includes(filename);
    });
    // 解析文章 Frontmatter
    return articleFiles.map((articleFile) => {
      const articleContent = fs.readFileSync(articleFile, "utf-8");
      const { data } = parseFrontmatter(articleContent);
      const filePath = articleFile
        .substring(articleFile.lastIndexOf("/docs/") + 17)
        .replace(/\.md$/, "");

      const [classify, year, month, day, title] = filePath.split("/");
      return {
        ...data,
        path: articleFile
          .substring(articleFile.lastIndexOf("/docs/") + 6)
          .replace(/\.md$/, ""),
        pageInfo: {
          classify,
          year,
          month,
          day,
          title,
        },
      };
    });
  },
};
