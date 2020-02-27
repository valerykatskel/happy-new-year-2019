var jbsoundVolume = 0.5;
var jbsound = new Howl({
  src: ['audio/background.mp3', 'audio/background.ogg'],
  autoplay: true,
  loop: true,
  volume: jbsoundVolume,
});

var slotStart = new Howl({
  src: ['audio/slotrun.mp3', 'audio/slotrun.ogg'],
  autoplay: false,
  loop: false,
  volume: 1,
});
var slotStop = new Howl({
  src: ['audio/slotstop.mp3', 'audio/slotstop.ogg'],
  autoplay: false,
  loop: false,
  volume: 0.6
});
let enableSlotSound = true;
let winnerCombinations;
let winners = [
    {a: 1, b: 1, c: 1, t: "Джэкпо-о-о-т! Дык у вас жа цэлых тры сімвалы багацця. «Васьмірог з расколкамі» азначае ўрадлівую энергію і багацце. Дождж грашовы насцігае, ты хапай яго рукамі! Вас чакае ўтрая прадуктыўны год. Памятаеце, як дзядзька Скрудж Макдак ныраў у грошы? Пераглядзіце і будзьце напагатове."},
    {a: 8, b: 8, c: 8, t: "У вас выпала трайная камбінацыя сімвала сям’і і ўрадлівасці. Блізкія будуць побач увесь год, клапоцячыся аб вас і дорачы сваю любоў. Калі мілы па душы, пражывём у шалашы! А да кагосьці відавочна прыляціць бусел… Не зачыняйце фортку! Бо дзеці — усмешка Божая."},
    {a: 0, b: 2, c: 5, t: "Вось дык магія! Магутны зарад энергіі забяспечаны на ўвесь год! У вас незвычайная камбінацыя трох розных сімвалаў беларускага арнамента, кожны з якіх азначае энергію! Вы будзеце фантаніраваць ідэямі і палаць актыўнасцю! Не верыце? Купіце эбанітавую палачку і праверце!"},
    {a: 1, b: 8, c: 6, t: "Камбінацыя «Васьмірог з расколкамі», «Лапа на дваццаць растоў», «Пладавітая зямля» азначае маладосць, прыгажосць і сямейны дабрабыт. Халасцякі і халасцячкі — гэта відавочны намёк на важнае рашэнне. Людзі сямейныя, ну вы зразумелі, што шлюб дапаможа захаваць вам квітнеючы выгляд. Нашто клад? Калі ў сям’і лад!"},
    {a: 3, b: 4, c: 2, t: "Усе праекты ў новым годзе будуць плённымі. Што ў справах, што ў асабістым жыцці! Чаму? Ды таму, што ў вас выпалі «Ураджайная ніва», «Лупаты казёл» і «Васьмірог». «Васьмірог» — вогненая энергія, «Ніва» — дастатак. Хто гадуе, той і мае! Але самы круты ў гэтым трыа «Лупаты казёл». Выпадае правераным людзям! Азначае працавітасць, інтуіцыю і багацце. Дзе каза ходзіць, там жыта родзіць!"},
    {a: 9, b: 10, c: 6, t: "Рух – жыццё. Аказваецца, выслоўе Арыстоцеля — гэта яшчэ і значэнне аднаго з сімвалаў беларускага арнамента. Ваша тройка — «Рух, жыццё», «Лапа на шаснаццаць растоў» і «Лапа на дваццаць растоў». «Рух» — дабрабыт, але што гэта за загадкавыя «лапы»? Усё проста — прыгажосць і маладосць. Выдатная камбінацыя, якой пазайздросціць любы інста-блогер ці фіта-няша."},
    {a: 5, b: 3, c: 1, t: "Ё-хо-хо! Так выкрыквалі маракі, калі ўсім разам трэба было прыкласці намаганні ў якой-небудзь справе — «Раз, два, узялі». Запомніце гэтую фразу! Бо ўсё, за што б вы не ўзяліся ў камандзе, чакае поспех. Калі робіш у купе, не баліць у пупе! Нездарма вам выпалі гэтыя сімвалы энергіі, багацця і пладавітасці. У рабочай хаце густа, а ў лянівай пуста."},
    {a: 7, b: 9, c: 2, t: "Алоха! Да чаго тут гавайскае прывітанне? Збірайце чамаданы! Бо ў вас выпала камбінацыя заўзятага падарожніка — «Васьмірогая, зорка» (звязда, сонца), «Рух, жыццё», «Васьмірог» (энергія). Заплануйце вандроўку вашай мары! Не адкладайце!"},
    {a: 4, b: 1, c: 9, t: "Усё ў хату, усё ў сям’ю! Вашыя сімвалы гавораць пра тое, што вы сапраўдны знаўца таго, што датчане называюць «хюгге» ці ўтульнае шчасце. У родным краю як у раю! Вы як ніхто іншы памятаеце пра простыя радасці жыцця і ўмееце атрымліваць ад іх асалоду."},
]

let completed = 0;
let symbolHight = 0;
let imgHeight = 2200;
let posArr = [
    {pos: 0, name: "энергія"},
    {pos: 1, name: "багацце"},
    {pos: 2, name: "энергія"},
    {pos: 3, name: "пладавітасць"},
    {pos: 4, name: "ураджай"},
    {pos: 5, name: "энергія"},
    {pos: 6, name: "маладосць"},
    {pos: 7, name: "сонца"},
    {pos: 8, name: "сям'я"},
    {pos: 9, name: "шлях"},
    {pos: 10, name: "прыгажосць"},
];

$(document).ready(function() {
    //show slots 1 seconds after page loaded
    setTimeout(function(){
        $('.bd').addClass('ready');
    }, 1000);

    //show tooltip 2 seconds after page loaded
    setTimeout(function(){
        $('#tooltip-start').addClass('show');
    }, 2000);


    /**
    * @class Slot
    * @constructor
    */
    function Slot(el, max, step) {
        this.speed = 0; //speed of the slot at any point of time
        this.step = step; //speed will increase at this rate
        this.si = null; //holds setInterval object for the given slot
        this.el = el; //dom element of the slot
        this.maxSpeed = max; //max speed this slot can have
        this.pos = null; //final position of the slot

        $(el).pan({
            fps:60,
            dir:'down'
        });
        $(el).spStop();
    }

    /**
    * @method start
    * Starts a slot
    */
    Slot.prototype.start = function() {
         // reset
        var el_id = $(this.el).attr('id');
        $._spritely.instances[el_id].t = -1*this.pos;
        $(this.el).find('.name').removeClass('an-show');

        this.speed = 0;
        completed = 0;
        $('#result').removeClass('show');
        $('#result .content').html('');

        var _this = this;
        $(_this.el).spStart();

        _this.si = window.setInterval(function() {
            if(_this.speed < _this.maxSpeed) {
                _this.speed += _this.step;
                if (_this.speed >= _this.maxSpeed*0.5) $(_this.el).addClass('motion');
                $(_this.el).spSpeed(_this.speed); //The $.spSpeed() method allows you to change a background speed absolutely (this is equivalent to a depth of 100):
            }
        }, 100);

    };


    /**
    * @method stop
    * Stops a slot
    */
    Slot.prototype.stop = function(idx) {
        var _this = this,
            limit = 30;
        clearInterval(_this.si);
        _this.si = window.setInterval(function() {
            if(_this.speed > limit) {
                _this.speed -= _this.step*Math.random(2);
                $(_this.el).spSpeed(_this.speed);
            }
            if(_this.speed <= limit) {
                _this.finalPos(idx);
                $(_this.el).spSpeed(0);
                $(_this.el).spStop();
                clearInterval(_this.si);
                if (enableSlotSound) 
                    slotStop.mute(false);
                else
                    slotStop.mute(true);
                slotStop.play();
                $(_this.el).removeClass('motion');
                $('#tooltip-start').removeClass('show');
                $(_this.el).find('.name').addClass('an-show');

                // draw symbol title
                _this.speed = 0;
            }
        }, 100);
    };

    /**
    * @method finalPos
    * Finds the final position of the slot
    */
    Slot.prototype.finalPos = function(idx) {
        var el = this.el,
            el_id,
            pos,
            best,
            bgPos,
            i,
            j,
            k;

        el_id = $(el).attr('id');
        $(el).attr( "data-id", idx );
        symbolHight = parseInt($(el).css('height'),10);
        //console.log("symbolHight = %d", symbolHight);
        $(el).find('.name').html('<span>'+posArr[idx].name+'</span>');

        this.pos = posArr[idx].pos * symbolHight;
        best = -1*this.pos;
        //console.log("id=%d y coords=%d px", idx, best);
        bgPos = "0 " + best + "px";
        $(el).animate({
            backgroundPosition:"(" + bgPos + ")"
        }, {
            duration: 200,
            complete: function() {
                completed ++;
                //console.log("Назва сімвалу: %s | completed=%s", posArr[idx].name, completed);
            }
        });
    };

    function enableControl() {
        $('#control').attr("disabled", false);
    }

    function disableControl() {
        $('#control').attr("disabled", true);
    }

    function printResult(t) {
        pos1 = -1 * posArr[t.a].pos * symbolHight;
        pos2 = -1 * posArr[t.b].pos * symbolHight;
        pos3 = -1 * posArr[t.c].pos * symbolHight;

        $('#sr1').css('background-position', "0 " + pos1 + "px");
        $('#sr2').css('background-position', "0 " + pos2 + "px");
        $('#sr3').css('background-position', "0 " + pos3 + "px");

        $('#srname1').html('<span>'+posArr[t.a].name+'</span>');
        $('#srname2').html('<span>'+posArr[t.b].name+'</span>');
        $('#srname3').html('<span>'+posArr[t.c].name+'</span>');

        $('#result .content').html(t.t);
    }

    // create slot objects
    var a = new Slot('#slot1', 30, 1),
        b = new Slot('#slot2', 45, 2),
        c = new Slot('#slot3', 70, 3);


    $( window ).resize(function() {
        if (winnerCombinations == undefined) return;
        let posa = winnerCombinations.a;
        let posb = winnerCombinations.b;
        let posc = winnerCombinations.c;
        let slot;

        let slotEl = $('.slot-wrapper .slot').eq(0);
        let els = $('.slot');
        let elsCount = els.length;
        let el_id = slotEl.attr('id');
        symbolHight = parseInt(slotEl.css('height'),10);
        //console.log("RESIZE symbolHight = %d", symbolHight);

        // symbol 1
        slot = $('#slot1');
        a.pos = posArr[posa].pos * symbolHight;
        bgPos = "0 " + -1*a.pos + "px";
        slot.css('backgroundPosition', bgPos);
        slot = $('#sr1');
        slot.css('backgroundPosition', bgPos);

        // symbol 2
        slot = $('#slot2');
        b.pos = posArr[posb].pos * symbolHight;
        bgPos = "0 " + -1*b.pos + "px";
        slot.css('backgroundPosition', bgPos);
        slot = $('#sr2');
        slot.css('backgroundPosition', bgPos);


        // symbol 3
        slot = $('#slot3');
        c.pos = posArr[posc].pos * symbolHight;
        bgPos = "0 " + -1*c.pos + "px";
        slot.css('backgroundPosition', bgPos);
        slot = $('#sr2');
        slot.css('backgroundPosition', bgPos);
    });


    $('#result-close').click(function(){
        $('#result').removeClass('show');
    })

    $('#sound-control').click(function() {
        enableSlotSound = !enableSlotSound;
        console.log("Sound is %s", enableSlotSound);
        if (enableSlotSound) {
            $(this).addClass('volume-on');
            jbsound.mute(false);
            slotStart.mute(false);
            slotStop.mute(false);
        } else {
            $(this).removeClass('volume-on');
            jbsound.mute(true);
            slotStart.mute(true);
            slotStop.mute(true);
        }
    })

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    /**
    * Slot machine controller
    */
    $('#control').click(function() {
        $('#tooltip-start').removeClass('show');
        if (enableSlotSound) 
            slotStart.mute(false);
        else
            slotStart.mute(true);
        slotStart.play();
        var x, y;
        var needStart = false, needStop =  true
        var rndNum = Math.ceil(getRandomInt(8));
        rndNum > 8 ? rndNum = 8 : "";
        winnerCombinations = winners[rndNum];
        //console.log("Номер %d\nКомбинация:\n1: %d\n2: %d\n3: %d\nТекст: %s",rndNum, winnerCombinations['a'], winnerCombinations['b'], winnerCombinations['c'], winners[rndNum].t);
        a.start();
        b.start();
        c.start();

        disableControl();
        x = window.setInterval(function() {
            if (a.speed >= a.maxSpeed && b.speed >= b.maxSpeed && c.speed >= c.maxSpeed && needStop & !needStart) {
                window.clearInterval(x);
                a.stop(winnerCombinations['a']);
                b.stop(winnerCombinations['b']);
                c.stop(winnerCombinations['c']);
                needStop = false;
                needStart = true;
            }
        }, 100);
        y = window.setInterval(function() {
            //let jpi;
            let jpic = 0;
            if (!needStop && needStart) {
                if(completed == 3) {

                    slotStart.stop();
                    //if (enableSlotSound) jackpot.play();
                    //isJackpot = true;
                    needStart = false;
                    needStop = true;

                    printResult(winnerCombinations);

                    var jpi = setTimeout(function(){
                        $('#result').addClass('show');
                        enableControl();
                    }, 500);

                    let modes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
                    let interval = 80;
                    modes.forEach(function(mode, index) {

                      setTimeout(() => {
                        $('.postcard-wrapper').toggleClass('active');
                      }, index * interval)
                    })

                }

            }
        }, 100);
        return false;
    });
});
