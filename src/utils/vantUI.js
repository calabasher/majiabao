import Vue from 'vue'

import {Locale} from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
Locale.use('en-US', enUS);

// 印尼语兼容
const messages = {
    'en-US': {
        name: 'Nama',
        tel: 'Telepon',
        save: 'Simpan',
        confirm: 'Konfirmasi',
        cancel: 'Batalkan',
        delete: 'Hapus',
        complete: 'lengkap',
        loading: 'Memuat...',
    }
};
Locale.add(messages);

import {
    Picker, Popup, Area, PasswordInput, NumberKeyboard, DatetimePicker, Dialog,
    Toast, Tabbar, TabbarItem, Button, Icon, Image,Divider,CountDown,Tag,
    Tab, Tabs, Row, Col, Cell, CellGroup, NoticeBar, NavBar, Field,
    RadioGroup, Radio, Checkbox, CheckboxGroup, List
} from 'vant'

Vue.use(Picker).use(Popup).use(Area).use(PasswordInput).use(NumberKeyboard).use(DatetimePicker).use(Dialog)
    .use(Tabs).use(Tab).use(Tabbar).use(TabbarItem).use(NoticeBar).use(Toast).use(Divider).use(Tag)
    .use(Icon).use(Button).use(Row).use(Col).use(Cell).use(CellGroup).use(Image).use(CountDown)
    .use(NavBar).use(Field).use(RadioGroup).use(Radio).use(Checkbox).use(CheckboxGroup).use(List)
