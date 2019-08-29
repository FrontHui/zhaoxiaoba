import Vue from 'vue';
import AumLoading from './aum-loading.vue'
import { type } from '../../../utils/index.js'
let instance;
const initInstance = () => {
	let _loading = Vue.extend(AumLoading);
	instance = new _loading({
		el: document.createElement('div')
	});
	document.body.appendChild(instance.$el);
};

// 删除指定dom
function _removeNode (node) {
	if (node && node.parentNode && node.tagName !== 'BODY') {
		node.parentNode.removeChild(node);
	}
}

const Loading = options => {
	var aumLoading = document.getElementById('_aum-loading');
	if (!instance) {
		initInstance();
	}
	Loading.vm = Object.assign(instance, options);
	if (!aumLoading) {
		document.body.appendChild(instance.$el);
	}
};

Loading.defaultOptions = {
	display: false,
	text: '正在加载中...',
	mask: true,
	type: 'default'
};

Loading.show = (options) => {
	if (type(options) !== 'undefined' && type(options) !== 'object') {
		return;
	}
	var option = Object.assign({}, Loading.currentOptions, options);
	option.display = true;
	Loading(option);
}

Loading.hide = function () {
	var aumLoading = document.getElementById('_aum-loading');
	if (instance) {
		instance.display = false;
	} else if (aumLoading) {
		_removeNode(aumLoading);
	}
};

Loading.setDefaultOptions = function (options) {
	Object.assign(Loading.currentOptions, options);
};

Loading.resetDefaultOptions = function () {
	Loading.currentOptions = Loading.defaultOptions;
	Loading.vm = {};
};

Vue.prototype.$loading = Loading;
Loading.resetDefaultOptions();

export default Loading;
