import { callApi } from "@/plugins/axios";

export default {
  methods: {
    $api(url, config) {
      return callApi(url, config);
    },
  },
};
