//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new StickCanvas();
            canvas.prepareCanvas($content.find(".explanation")[0], checkioInput, rightResult);
            canvas.animateCanvas();

            this_e.setAnimationHeight($content.height() + 60);

        });

        var $tryit;
        var tCanvas;
        var data;

        ext.set_console_process_ret(function (this_e, ret) {
            var $chRes = $tryit.find(".checkio-result");
            $chRes.html("");
            try {
                ret = JSON.parse(ret);
            }
            catch(err) {
                $chRes.html("Can't parse the result.<br> Result:<br>" + ret);
                return false;
            }

            if (!Array.isArray(ret)) {
                $chRes.html("The result is not a list.<br> Result:<br>" + JSON.stringify(ret));
                return false;
            }
            var sum = 0;
            for (var i = 0; i < ret.length; i++){
                if (isNaN(ret[i])) {
                    $chRes.html("The list should conatain only numbers.<br> Result:<br>" + JSON.stringify(ret));
                    return false;
                }
                if (Number(ret[i]) !== Math.floor(Number(ret[i]))) {
                    $chRes.html("The list should conatain only integers.<br> Result:<br>" + JSON.stringify(ret));
                    return false;
                }
                sum += ret[i];
            }
            if (isNaN(data) || Number(data) !== Math.floor(Number(data))) {
                $chRes.html("The input data is not an integer.<br> Result:<br>" + JSON.stringify(ret));
                return false;
            }
            if (data <= 0) {
                $chRes.html("The input data is not an positive integer.<br> Result:<br>" + JSON.stringify(ret));
                return false;
            }

            if (sum > data) {
                $chRes.html("The sum of the parts is greater than the stick's length.<br> Result:<br>" + JSON.stringify(ret));
                return false;
            }
            $chRes.html("Result:&nbsp;" + JSON.stringify(ret));
            tCanvas.prepareCanvas($tryit.find(".tryit-canvas")[0], data, ret);
            tCanvas.animateCanvas();
        });

        ext.set_generate_animation_panel(function (this_e) {
            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
            tCanvas = new StickCanvas();

//                {x0: 5, y0: 10, sizeX: 300});
            var $input = data = $tryit.find(".input-length");

            $tryit.find('.bn-check').click(function (e) {
                e.preventDefault();
                data = $input.val();
                tCanvas.clear();
                if (!isNaN(data)) {
                    data = Number(data);
                }

                this_e.sendToConsoleCheckiO(data);
                e.stopPropagation();
                return false;
            });
        });

        function StickCanvas(options) {
            var format = Raphael.format;
            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            options = options || {};

            var x0 = options.x0 || 10,
                y0 = options.y0 || 10,
                sizeX = options.sizeX || 380;

            var sizeY;

            var padding = options.padding || 20;
            var textPadding = options.textPadding || 40;

            var fontSize = options.fontSize || 15;

            var widthLine = options.widthLine || 10;

            var attrBackLine = {"stroke": colorBlue2, "stroke-width": widthLine};
            var attrMainLine = {"stroke": colorBlue4, "stroke-width": widthLine};
            var attrPartLine = {"stroke": colorBlue3, "stroke-width": widthLine};

            var attrNumb = {"font-size": fontSize, "stroke": colorBlue4, "font-family": "Verdana", "font-weight": "bold"};

            var unit;
            var paper;
            var partSet;

            var delay = 300;
            var stepDelay = delay * 1.2;


            this.prepareCanvas = function (dom, stickLen, parts) {
                if (stickLen > 999) {
                    textPadding = (String(stickLen).length + 1) * 10;
                }
                else {
                    textPadding = 40;
                }
                paper = Raphael(dom, sizeX, (parts.length) * padding + y0 * 2);
                partSet = paper.set();
                var maxSize = sizeX - 2 * x0 - textPadding;
                unit = maxSize / stickLen;
                paper.path(format("M{0},{1}H{2}",
                    x0 + textPadding,
                    y0,
                    sizeX - x0)).attr(attrBackLine);
                paper.text(x0 + textPadding / 2, y0, stickLen).attr(attrNumb);
                var startPart = x0 + textPadding;
                for (var i = parts.length - 1; i >= 0; i--) {
                    var endPart = parts[i] * unit + startPart;
                    var p = paper.path(format(
                        "M{0},{1}H{2}",
                        startPart, y0, endPart
                    )).attr(attrMainLine);
                    p.mark = parts[i];
                    partSet.push(p);
                    startPart = endPart;
                }
            };

            this.animateCanvas = function () {
                for (var i = 0; i < partSet.length; i++) {
                    setTimeout(function (k) {
                        return function () {
                            var p = partSet[k];
                            var newPath = format("M{0},{1}H{2}",
                                x0 + textPadding,
                                y0 + padding * (k + 1),
                                x0 + textPadding + unit * p.mark
                            );
                            partSet[k].animate({path: newPath, "stroke": colorBlue3}, delay, function () {
                                paper.text(x0 + textPadding / 2, y0 + padding * (k + 1), p.mark).attr(attrNumb);
                            });

                        }
                    }(i), stepDelay * i);
                }
            };

            this.clear = function() {
                if (paper) {
                    paper.remove();
                    paper = false;
                }
            }
        }


    }
);
