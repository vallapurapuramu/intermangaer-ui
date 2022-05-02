import { mount } from "@vue/test-utils";
import login from "../../src/views/Login.vue";

describe("login", () => {
    const wrapper = mount(login);

  it("testing the page is addEvent  ", () => {
    //expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find("h4").exists()).toBe(true);
  });

  it("testing the whether the submit components are currently rendered or not in addEvent  ", () => {
    //expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find("#submit").exists()).toBe(true);
  });
});