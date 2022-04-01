import { mount } from "@vue/test-utils";
import applyform from "../../src/views/ApplyFormEdit.vue";

describe("Login.vue", () => {
    const wrapper = mount(applyform);

  it("testing the page is addEvent  ", () => {
    //expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find("h4").exists()).toBe(true);
  });

  it("testing the whether the submit components are currently rendered or not in addEvent  ", () => {
    //expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find("#save").exists()).toBe(true);
  });
});