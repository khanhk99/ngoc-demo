!function (t) {
    "use strict";
    var s = function (s, e) {
        this.el = t(s), this.options = t.extend({}, t.fn.typed.defaults, e), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = !this.isInput && this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.strings = this.options.strings, this.array_id = this.options.array_id, this.array_count = this.options.array_count, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.template = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    s.prototype = {
        constructor: s, init: function () {
            var t = this;
            t.timeout = setTimeout(function () {
                for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        }, build: function () {
            !0 === this.showCursor && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.init()
        }, typewrite: function (t, s) {
            if (!0 === this.stop) return !1;
            var e = Math.round(70 * Math.random()) + this.typeSpeed, r = this;
            r.timeout = setTimeout(function () {
                var e = 0, o = t.substr(s);
                if ("^" === o.charAt(0)) {
                    var i = 1;
                    /^\^\d+/.test(o) && (i += (o = /\d+/.exec(o)[0]).length, e = parseInt(o)), t = t.substring(0, s) + t.substring(s + i)
                }
                if ("html" === r.contentType) {
                    var n = t.substr(s).charAt(0);
                    if ("<" === n || "&" === n) {
                        var a;
                        for (a = "<" === n ? ">" : ";"; t.substr(s).charAt(0) !== a;) t.substr(s).charAt(0), s++;
                        s++, a
                    }
                }
                r.timeout = setTimeout(function () {
                    if (s === t.length) {
                        if (r.options.onStringTyped(r.options.array_id), r.arrayPos === r.strings.length - 1 && (r.options.callback(), r.curLoop++, !1 === r.loop || r.curLoop === r.loopCount)) return;
                        r.timeout = setTimeout(function () {
                            r.backspace(t, s)
                        }, r.backDelay)
                    } else {
                        0 === s && r.options.preStringTyped(r.arrayPos);
                        var e = t.substr(0, s + 1);
                        r.attr ? r.el.attr(r.attr, e) : r.isInput ? r.el.val(e) : "html" === r.contentType ? r.el.html(e) : r.el.text(e), s++, r.typewrite(t, s)
                    }
                }, e)
            }, e)
        }, backspace: function (t, s) {
            if (!0 === this.stop) return !1;
            var e = Math.round(70 * Math.random()) + this.backSpeed, r = this;
            r.timeout = setTimeout(function () {
                if ("html" === r.contentType && ">" === t.substr(s).charAt(0)) {
                    for (; "<" !== t.substr(s).charAt(0);) t.substr(s).charAt(0), s--;
                    s--, "<"
                }
                var e = t.substr(0, s);
                r.attr ? r.el.attr(r.attr, e) : r.isInput ? r.el.val(e) : "html" === r.contentType ? r.el.html(e) : r.el.text(e), s > r.stopNum ? (s--, r.backspace(t, s)) : s <= r.stopNum && (r.arrayPos++, r.arrayPos === r.strings.length ? (r.arrayPos = 0, r.shuffle && (r.sequence = r.shuffleArray(r.sequence)), r.init()) : r.typewrite(r.strings[r.sequence[r.arrayPos]], s))
            }, e)
        }, shuffleArray: function (t) {
            var s, e, r = t.length;
            if (r) for (; --r;) s = t[e = Math.floor(Math.random() * (r + 1))], t[e] = t[r], t[r] = s;
            return t
        }, reset: function () {
            clearInterval(this.timeout);
            var t = this.el.attr("id");
            this.el.after('<span id="' + t + '"/>'), this.el.remove(), void 0 !== this.cursor && this.cursor.remove(), this.options.resetCallback()
        }
    }, t.fn.typed = function (e) {
        return this.each(function () {
            var r = t(this), o = r.data("typed");
            o || r.data("typed", o = new s(this, "object" == typeof e && e)), "string" == typeof e && o[e]()
        })
    }, t.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        typeSpeed: 50,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 50,
        array_id: !1,
        array_count: !1,
        loop: !1,
        template: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function () {
        },
        preStringTyped: function () {
        },
        onStringTyped: function () {
        },
        resetCallback: function () {
        }
    }
}(window.jQuery);
