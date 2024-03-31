// 在 tools.js 文件中添加以下代码：
document.getElementById('category-select').addEventListener('change', function(e) {
    const selectedCategory = e.target.value;
    const items = document.querySelectorAll('.char .item');
  
    items.forEach(item => {
      const category = item.dataset.category;
  
      // 根据所选类别显示或隐藏项目
      if (selectedCategory === '' || selectedCategory === category) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });