/*
 * @Descriptio
 * @Author: duanwensheng
 * @Date: 2023-07-08 18:12:19
 */

class myPromise {
  status = "pending";
  value = undefined;
  reason = undefined;

  // 完成处理函数队列
  resolvedQueue = [];
  // 拒绝处理函数队列
  rejectedQueue = [];

  constructor(executor) {
    // 完成处理函数
    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        this.resolvedQueue.forEach((fn) => fn(this.value));
      }
    };

    // 错误处理函数
    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.rejectedQueue.forEach((fn) => fn(this.reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(fulfilldHandler, rejectedHandler) {
    // 默认值处理
    fulfilldHandler =
      typeof fulfilldHandler === "function" ? fulfilldHandler : (v) => v;
    rejectedHandler =
      typeof rejectedHandler === "function"
        ? rejectedHandler
        : (err) => {
            throw new Error(err);
          };

    // 挂起状态
    if (this.status === "pending") {
      //   console.log("注册then");
      return new myPromise((resolve, reject) => {
        this.resolvedQueue.push(() => {
          try {
            const result = fulfilldHandler(this.value);
            // console.log(
            //   "fulfilldHandler----result",
            //   result instanceof myPromise
            // );
            if (result instanceof myPromise) {
              result.then(
                (res) => {
                  resolve(res);
                },
                (err) => reject(err)
              );
            } else {
              //   console.log("立即值");
              resolve(result);
            }
          } catch (err) {
            reject(err);
          }
        });

        this.rejectedQueue.push(() => {
          try {
            const result = rejectedHandler(this.reason);
            if (result instanceof myPromise) {
              result.then((res) => resolve(res)).catch((err) => reject(err));
            }
            resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      });
    }

    // 决议状态为已完成
    if (this.status === "fulfilled") {
      return new myPromise((resolve, reject) => {
        try {
          // 如果fulfilled 中返回是个promise 或者thenable
          const result = fulfilldHandler(this.value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    }

    // 决议状态为拒绝
    if (this.status === "rejected") {
      return new myPromise((resolve, reject) => {
        try {
          const result = rejectedHandler(this.reason);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    }
  }

  catch(rejectedHanlder) {
    return this.then(null, rejectedHanlder);
  }

  static resolve(val) {
    // 要判断是否是promise 或 thenable 对象
    if (val && val.then) {
      return val;
    }

    return new myPromise((resolve) => resolve(val));
  }

  static reject(reason) {
    return new myPromise((resovle, reject) => reject(reason));
  }

  static all(prList) {
    prList = Array.isArray(prList) ? prList : [];
    let result = []; // 储存成功的结果值
    let isReject = false;

    return new myPromise((resolve, reject) => {
      if (prList.length === 0) {
        resolve([]);
      }

      prList.forEach((pr) => {
        pr.then((val) => {
          if (isReject) return undefined;

          result.push(val);
          if (result.length === prList.length) {
            resolve(result);
          }
        }).catch((err) => {
          isReject = true;
          result = [];
          reject(err);
        });
      });
    });
  }

  static race(prList) {
    prList = Array.isArray(prList) ? prList : [];
    let isResolved = false;
    // let isRejected = false;
    return new myPromise((resolve, reject) => {
      prList.forEach((pr) => {
        pr.then((val) => {
          if (isResolved) return undefined;

          isResolved = true;
          resolve(val);
        }).catch((err) => {
          reject(err);
        });
      });
    });
  }
}
