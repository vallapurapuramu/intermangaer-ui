import { mount } from "@vue/test-utils";
import register from "../../src/views/Register.vue";

describe("Login.vue", () => {
    const wrapper = mount(register);

  it("testing the page is addEvent  ", () => {
    //expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find("h4").exists()).toBe(true);
  });

  it("testing the whether the submit components are currently rendered or not in addEvent  ", () => {
    //expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find("#register").exists()).toBe(true);
  });
});