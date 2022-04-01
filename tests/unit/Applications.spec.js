import { mount } from "@vue/test-utils";
import applications from "../../src/views/Applications.vue";

describe("Login.vue", () => {
    const wrapper = mount(applications);

  it("testing the page is addEvent  ", () => {
    //expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find("h4").exists()).toBe(true);
  });

  it("testing the whether the submit components are currently rendered or not in addEvent  ", () => {
    //expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find("#back").exists()).toBe(true);
  });
});