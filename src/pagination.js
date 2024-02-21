import { useLeads } from "./leads";
import { state } from "./state";
import { createTable } from "./table";

const { getLeads, sortLeads } = useLeads();
const table = createTable();

export const createPagination = () => {
  const buttons = [
    { label: "prev", icon: true, value: -1 },
    { label: "prevNum", icon: false, value: -1 },
    { label: "self", icon: false, value: 0 },
    { label: "nextNum", icon: false, value: 1 },
    { label: "next", icon: true, value: 1 },
  ];
  const create = (links, page, limit) => {
    const wrapper = document.createElement("div");
    wrapper.classList = ["flex justify-end gap-2"];
    wrapper.id = "pagination";

    buttons.forEach((button) => {
      const b = document.createElement("button");
      b.classList = [
        "w-8 h-8 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 transition-all rounded ring-1 ring-inset ring-slate-600",
      ];
      if (button.icon) {
        b.innerText = button.value > 0 ? ">" : "<";
      } else {
        b.innerText = page + button.value;
      }
      b.addEventListener("click", () => handler(button, page, limit));

      if (
        (button.label === "prevNum" && !links.prev) ||
        (button.label === "nextNum" && !links.next)
      ) {
        return;
      }

      if (
        (button.label === "prev" && !links.prev) ||
        (button.label === "next" && !links.next) ||
        button.label === "self"
      ) {
        b.setAttribute("disabled", "");
        b.classList.add("cursor-not-allowed");
        b.classList.add("opacity-50");
        b.classList.remove("hover:bg-slate-600");
      }

      wrapper.appendChild(b);
    });

    return wrapper;
  };

  const handler = async (button, page, limit) => {
    table.toggleStatus();
    const res = await getLeads(limit, page + button.value);
    table.toggleStatus();
    update(res._links, res._page, limit);
    table.update(sortLeads(res.data, state.sort.value, state.sort.type));
  };

  const mount = (element, links, page, limit) => {
    element.appendChild(create(links, page, limit));
  };

  const update = (links, page, limit) => {
    const pagination = document.querySelector("#pagination");
    pagination.parentNode.replaceChild(create(links, page, limit), pagination);
  };

  return { mount, update };
};
