import { observable, computed, action } from 'mobx';

class Demo {
  @observable price = 2;

  @observable amount = 1;

  @observable lastTotal = null;

  @computed get total() {
    return this.price * this.amount;
  }

  @action updateTotal = (text, type) => {
    this.lastTotal = this.total;
    switch (type) {
      case 'price':
        this.price = text;
        break;
      case 'amount':
        this.amount = text;
        break;
      default:
        break;
    }
  }
}

export default new Demo();
