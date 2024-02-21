export const createDropdown = (options) => {
  const { label, content, handler } = options;

  const data = {
    selected: content[0],
  };

  const create = () => {
    const wrapper = document.createElement("div");
    wrapper.classList = ["relative inline-block text-left dropdown"];

    wrapper.id = "dropdown";

    const button = document.createElement("div");
    button.innerHTML = `
        <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-slate-600 hover:bg-slate-600 transition-all" id="menu-button" aria-expanded="true" aria-haspopup="true">
        ${label} ${data.selected.label}
        <svg class="-mr-1 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
        </button>
    `;
    button.addEventListener("click", (e) => toggle(e));

    const menu = document.createElement("div");
    menu.classList = [
      "absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-700 shadow-lg ring-1 ring-slate-600 focus:outline-none hidden menu-wrapper",
    ];
    menu.setAttribute("role", "menu");
    menu.innerHTML = `    
        <div class="py-1" role="none"></div>
    `;

    content.forEach((item) => {
      const menuItem = document.createElement("a");
      menuItem.classList = [
        "cursor-pointer text-white hover:bg-slate-600 block px-4 py-2 text-sm",
      ];
      menuItem.innerText = item.label;
      menuItem.addEventListener("click", (e) => select(e, item));
      menu.children[0].appendChild(menuItem);
    });

    wrapper.appendChild(button);
    wrapper.appendChild(menu);

    return wrapper;
  };

  const mount = (element) => {
    element.appendChild(create());
  };

  const update = (e) => {
    const dropdown = e.target.closest(".dropdown");
    dropdown.parentNode.replaceChild(create(), dropdown);
  };

  const toggle = (e) => {
    const dropdown = e.target.closest(".dropdown");
    dropdown.querySelector(".menu-wrapper").classList.toggle("hidden");
  };

  const select = async (e, item) => {
    toggle(e);
    if (data.selected.value === item.value) return;
    data.selected = item;
    update(e);
    await handler(item);
  };

  return { mount, data };
};
