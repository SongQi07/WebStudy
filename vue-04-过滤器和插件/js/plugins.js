(function () {
    const MyPlugin = {}
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod = function () {
            alert('MyPlugin.myGlobalMethod全局方法调用了')
        }
        // 2. 添加全局指令
        Vue.directive('my-directive', {
            inserted(el, binding) {
                el.innerHTML = 'MyPlugin.my-directive指令被调用了'+binding.value
            }
        })
        // 3. 添加实例方法
        Vue.prototype.$myMethod = function (value) {
            alert('Vue实例方法myMethod被调用了'+value)
        }
    }
    //将插件添加到window对象里面
    window.MyPlugin = MyPlugin
})()

