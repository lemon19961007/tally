import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
  // tag store
  tagList: [] as tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },

  createTag(name: string, icon: string) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名已存在');
      return 'duplicated';
    }
    const id = createId().toString();
    this.tagList.push({id, name: name, icon: icon});
    this.saveTags();
    window.alert('添加成功');
    return 'success';
  },

  updateTag(id: string, name: string, icon: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        tag.id = id;
        tag.icon = icon;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },

  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },

  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};

tagStore.fetchTags();

export default tagStore;