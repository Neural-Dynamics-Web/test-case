const containerRoot = $("#container");

function renderCategory(categoryData) {
  try {
    const categoryEl = $("<a></a>");
    categoryEl.addClass("list-group-item");

    if (categoryData.children.length) {
      categoryEl.attr("href", `#${categoryData.categoryCode}`);
      categoryEl.attr("data-toggle", "collapse");
      categoryEl.html(
        `<i class="glyphicon glyphicon-chevron-right"></i>${categoryData.categoryName}`
      );
    } else {
      categoryEl.attr("href", `#`);
      categoryEl.html(`${categoryData.categoryName}`);
      return categoryEl[0].outerHTML;
    }

    if (categoryData.children.length) {
      const childrensList = $("<div></div>");
      childrensList.addClass("list-group collapse");
      childrensList.attr("id", categoryData.categoryCode);

      categoryData.children.forEach((category) => {
        const subCategoryEl = renderCategory(category);
        childrensList.append(subCategoryEl);
      });
      return categoryEl[0].outerHTML + childrensList[0].outerHTML;
    }

    return categoryEl;
  } catch (error) {
    console.error(`Error while render category data: ${error}`);
  }
}

async function renderCategories() {
  const response = await fetch("./data.json");
  const categoriesData = await response.json();

  categoriesData.forEach((category) => {
    const categoryEl = renderCategory(category);
    containerRoot.append($(categoryEl));
  });
}

$(function () {
  $(document).on("click", ".list-group-item", function () {
    $(".glyphicon", this)
      .toggleClass("glyphicon-chevron-right")
      .toggleClass("glyphicon-chevron-down");
  });

  renderCategories();
});
