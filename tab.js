let that

class Tab {
  constructor(id) {
    that = this
    this.main = document.querySelector(id)
    this.ul = this.main.querySelector('.fisrstnav ul:first-child')
    this.tabscon = this.main.querySelector('.tabscon')
    this.tabadd = this.main.querySelector('.tabadd')
    this.init()
  }

  updateNode() {
    this.lis = this.main.querySelectorAll('li')
    this.sections = this.main.querySelectorAll('section')
    this.spans = this.main.querySelectorAll('.fisrstnav ul li span:first-child')
    this.closeBtn = this.main.querySelectorAll('.icon-guanbi')
  }
  //初始化 事件
  init() {
    this.updateNode()
    this.tabadd.onclick = this.addTab
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
      this.closeBtn[i].onclick = this.removeTab
      this.spans[i].ondblclick = this.editTab
      this.sections[i].ondblclick = this.editTab
    }

  }

  //1. 切换
  toggleTab() {
    console.log(this); //this指向当前的引用对象 li
    that.clearClass()
    that.lis[this.index].className = 'liactive'
    that.sections[this.index].className = 'conactive'
    // that.lis[this.index].style.cursor = 'pointer'
  }

  //清除所有类样式
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.sections[i].className = ''
    }
  }

  // 2. 添加
  addTab() {
    that.clearClass()
    let random = Math.random()
    let li = ' <li class="liactive"><span> 测试xx</span><span class="iconfont icon-guanbi"></span></li >'
    let section = '<section class="conactive">测试' + random + '</section>'
    that.ul.insertAdjacentHTML('beforeend', li)
    that.tabscon.insertAdjacentHTML('beforeend', section)
    that.init()
  }

  // 3. 删除
  removeTab(e) {
    //阻止冒泡 防止触发li 的切换事件
    e.stopPropagation()
    //获取父级li的index索引值
    let index = this.parentNode.index
    console.log(index);
    that.lis[index].remove()
    that.sections[index].remove()
    // index--
    // that.ul.removeChild(that.lis[index])
    // that.tabscon.removeChild(that.sections[index])
    that.init()
    //当删除的不是选中状态的li时，原来的选中状态保持不变
    if (document.querySelector('.liactive')) return
    //判断是否处于第一个，当处于第一个时，后一个li处于选定状态
    if (index === 0) {
      index++
    }
    //当删除选中状态的li时，前一个li处于选定状态
    index--
    //手动调用点击事件，如果存在索引号则触发，否则不触发点击事件
    that.lis[index] && that.lis[index].click()
  }

  // 4. 编辑
  editTab() {
    let val = this.innerHTML
    console.log(val);
    //双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = '<input type="text" />'
    let input = this.children[0]
    input.value = val
    input.select()
    //失去焦点
    input.onblur = function () {
      console.log(this);//指向input
      this.parentNode.innerHTML = this.value
    }
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        this.blur()
      }
    }
  }
}

new Tab('#tab')