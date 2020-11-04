(function (Vue) {
	const items=[
		{
			id:1,
			content:'vue.js',
			completed:true
		},
		{
			id:2,
			content:'java',
			completed:true
		},
		{
			id:3,
			content:'python',
			completed:true
		},
		{
			id:4,
			content:'c++',
			completed:false
		}
	]

	//注册全局指令
	Vue.directive('app-focus',{
		inserted(el,binding){
			el.focus()
		}
	})

	var app = new Vue({
		el:'#todoapp',
		data:{
			items,
			currentItem:null,
			filterStatus:'all'
		},
		watch: {
			items:function(newValue,old){

			}
		},
		//自定义局部指令
		directives:{
			//钩子函数
			'todo-focus':{
				update(el,binding){
					if(binding.value){
						el.focus()
					}
				}
			}
		},

		//定义计算属性
		computed: {
			//根据不同状态过滤不同数据
			filterItems(){
				switch (this.filterStatus) {
					case 'active':
						//过滤未完成的数据
						return this.items.filter(item=>!item.completed)
						break;
					case 'completed':
						return this.items.filter(item=>item.completed)
						break;
					
					default:
						return this.items
						break;
				}
			},
			toggleAll:{
				get(){
					console.log('get',this.remaining)
					return this.remaining === 0
				},
				set(newStatus){
					console.log('set')
					this.items.forEach(item => {
						item.completed = newStatus
					});
				}
			},
			remaining(){
				const unItem = this.items.filter(function(item){
					return !item.completed
				})
				return unItem.length
			}
		},
		methods: {
			finishEdit(item,index,event){
				const content = event.target.value.trim()
				if(!content){
					this.removeItem(index)
					return
				}
				item.content = content
				this.currentItem = null
			},
			cancelEdit(){
					this.currentItem = null
			},
            toEdit(item){
				console.log(item)
				 this.currentItem = item
			},
			removeCompleted(){
				this.items = this.items.filter(item => !item.completed)
			},
			removeItem(index){
				this.items.splice(index,1)
			},
			enter(event){
				console.log('addItem', event.target.value)
				const content = event.target.value.trim()
				if(!content.length){
					alert('请输入内容进行添加！')
					return
				}
				const id = this.items.length+1
				this.items.push({
					id,
					content,
					completed:false
				})
				event.target.value = ''
			}
		},
	})
	window.onhashchange = function(){
		console.log('hash值改变了',window.location.hash)
		const hash = window.location.hash.substr(2)||'all'
		//状态一旦改变就会赋值给filterStatus
		//定义一个计算属性
		app.filterStatus = hash
	}
	window.onhashchange()
})(Vue);
