import Vue from "vue";
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  TabPane,
  Row,
  Col,
  Upload,
  Card,
  Select,
  Option
} from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(TabPane);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Card);
Vue.use(Card);
Vue.use(Select)
Vue.use(Option)
import { Toast,DatetimePicker,Picker  } from 'mint-ui';

Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.prototype.$message = Message;
