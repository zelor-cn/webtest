var zObj = ( function () {
  var value = 0;
  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
      return value;
    }
  };
}() );

var fade = function (node) {
  var level = 1;
  var step = function () {
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

var add_the_handlers = function (nodes) {
  var helper = function(i) {
    return function (e) {
      //document.writeln(i);
      //目前不在带参数e的函数中调用，即可正常执行。暂时不知为何。
      //现在知道了，应该加上括号表示立即执行。原来调试根本没走进该函数。
      alert(i);
    }();
  };
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = helper(i);
  }
};

/* 经典版本fibonacci
var fibonacci = function (n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
*/
var fibonacci = function (n) {
  var memo = [0, 1];
  var fib = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}();

///*
var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function () {
  return this.name;
};

Mammal.prototype.says = function() {
  return this.saying || "";
};
///*/
function ZT02() {

  var mammal = function (spec) {
    var that = {};
    that.get_name = function () {
      return spec.name;
    };
    that.says = function () {
      return spec.saying || "";
    };

    return that;
  };
  var myMammal = mammal({name:"Herb"});
  ///console.debug( myMammal.get_name() + myMammal.saying() );
  var cat = function (spec) {
    spec.saying = spec.saying || "meow";
    var that = mammal(spec);
    that.purr = function (n) {
      var i, s = "";
      for ( i = 0; i < n; i += 1) {
        if (s) {
          s += "-";
        }
        s += "r";
      }
      return s;
    };

    that.get_name = function () {
      return that.says() + spec.name + " " + that.says();
    };

    return that;
  };

  var myCat = cat({name:"Herietta"});
  console.debug(myCat.get_name()); 

  ///*
  Object.method("superior", function(name) {
    /*
    var that = this, method = that[name];
    return function() {
      return method.apply(that, arguments);
    };
    */
  });
  //*/
  
  /*
  var coolcat = function (spec) {
    var that = cat(spec), super_get_name = that.superior("get_name");
    that.get_name = function (n) {
      return "like" + super_get_name + "baby";
    };
    return that;
  };
  var myCoolCat = coolcat({name: "Bix"});
  var name = myCoolCat.get_name();
  console.debug( name );
  */
};

function ZTestFunc() {
  var a = 2 + 3;
  document.getElementById("myDiv").innerHTML = a;
  console.debug(isNaN(a));
  var sto = {
    "first_name":"Hello",
    "last_name":"Kitty"
  };
  console.debug( sto.hasOwnProperty("first_name") );
  console.debug(sto);
  zObj.increment( 12 );
  document.getElementById("d2").innerHTML = zObj.getValue();
  //document.writeln("writeln");
  ///fade( document.body);
  var ia = [ 1, 2, 3 ];
  ///add_the_handlers( ia );
  ///var add1 = add.curry(1);
  ///document.writeln(add1(6));
  /*
  for (var i = 0; i <= 10; i += 1) {
    document.writeln( '//' + i +':' + fibonacci(i) );
  }
  */

  var myMammal = new Mammal("Herb the Mammal");
  var name = myMammal.get_name();
  document.writeln(name);
  var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
  };

  Cat.prototype = new Mammal();
  Cat.prototype.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
      if ( s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };

  Cat.prototype.get_name = function() {
    return this.says() + ' ' + this.name + ' ' + this.says();
  };

  var myCat = new Cat("Henrietta");
  var says = "\r\n  " + myCat.says();
  console.debug( says );
  var purr = myCat.purr(5);
  console.debug( purr );
  var name = myCat.get_name();
  console.debug( name );
 
  var zMamm = {
    first:"f", middle:"m", last:"l", state:"s", city:"c", name:"n",
    get_first: function() {
      return this.first;
    },
    get_name : function()  {
      return this.name; 
    },
    says: function() {
      return this.saying || "";
    }
  };

  var myCat2 = Object.create(zMamm);
  myCat2.name = "Hello Kitty";
  myCat2.saying = "meow";
  console.debug( myCat2.get_name() + myCat2.says() );
  ZT02();
};
