// 获取所有的按钮（包括“全部显示”按钮）
const categoryButtons = document.querySelectorAll('.input .value');

// 获取所有待筛选的项目
const itemsToFilter = document.querySelectorAll('.char .item');

// 监听按钮点击事件
categoryButtons.forEach(button => {
  button.addEventListener('click', event => {
    const selectedCategory = event.target.dataset.category;

    // 隐藏所有项目
    itemsToFilter.forEach(item => {
      item.style.display = 'none';
    });

    // 显示与所选类别匹配的项目
    if (selectedCategory === 'all') {
      itemsToFilter.forEach(item => {
        item.style.display = '';
      });
    } else {
      itemsToFilter.forEach(item => {
        const itemCategory = item.dataset.category;
        if (selectedCategory === itemCategory) {
          item.style.display = '';
        }
      });
    }
  });
});



/*  保留下拉筛选功能的js
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

// 获取所有的按钮和表单元素
const buttons = document.querySelectorAll('.input .value');
const forms = document.querySelectorAll('.category-form');

// 监听按钮点击事件
buttons.forEach(button => {
  button.addEventListener('click', event => {
    const category = event.target.dataset.category;

    // 隐藏所有表单
    forms.forEach(form => form.classList.add('hidden'));

    // 显示与点击按钮关联的表单
    const targetForm = document.querySelector(`.category-form-${category}`);
    if (targetForm) {
      targetForm.classList.remove('hidden');
    }
  });
});

// 获取所有的按钮
const categoryButtons = document.querySelectorAll('.input .value');

// 获取所有待筛选的项目
const itemsToFilter = document.querySelectorAll('.char .item');

// 监听按钮点击事件
categoryButtons.forEach(button => {
  button.addEventListener('click', event => {
    const selectedCategory = event.target.dataset.category;

    // 隐藏所有项目
    itemsToFilter.forEach(item => {
      item.style.display = 'none';
    });

    // 显示与所选类别匹配的项目
    itemsToFilter.forEach(item => {
      const itemCategory = item.dataset.category;
      if (selectedCategory === itemCategory) {
        item.style.display = '';
      }
    });
  });
});
*/