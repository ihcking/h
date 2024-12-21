<?php
header("Content-Type:text/html;charset=utf-8");
$wd = $_GET['wd'];
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$curlPost = "keywords=".urlencode($wd)."&page=$page";
$url = "http://newapi.if4.fgct.cc/json/search?".$curlPost;
$data = file_get_contents($url);
if ($data === false) {
}
$json_lanzou = json_decode($data);
if ($json_lanzou === null) {
}
$array_tmp = array();
$i = 0;
$keywords = array('chatGPT','lsp','关键词','关键词');//广告及关键词可在这里屏蔽
foreach($json_lanzou as $dates) {
    if(is_array($dates)){
        foreach($dates as $date) {
            $title = $date->title;
            foreach ($keywords as $keyword) {
                if (strpos($title, $keyword) !== false) {
                    continue 2;
                }
            }
            $array_tmp[$i] = [
                "dates" => $date->dates,
                "link" => $date->link,
                "size" => $date->size,
                "title" => $date->title,
            ];
            $i++;
        }
    } else {
        
    }
}
$per_page = 10;
$total_results = count($array_tmp);
$total_pages = ceil($total_results / $per_page);
$start = ($page - 1) * $per_page;
$end = $start + $per_page;
$results = array_slice($array_tmp, $start, $per_page);

$arr = array(
    'status' => true,
    'code' => '200',
    'data' => $results,
);
?>
<!DOCTYPE html>
<html lang="zh-cn">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="author" content="anle">
        <meta name="template" content="anle" />
        <meta name="fragment" content="!">
        <meta name="description" content="">
        <meta name="keywords" content="">
        <title>《<?php echo $wd ?>》搜索结果 - 网盘搜索,就上蓝搜搜 - 好用的蓝奏云搜索引擎</title>
        <link rel="icon" href="favicon.ico">
        <link rel="stylesheet" href="css/loading.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/iconfont.css">
        <script src="js/jquery.min.js"></script>
        <script src="js/script.js"></script>
        <script src="js/tocbot.min.js"></script>
    </head>
    <body>
        <div id="pre-loader" class="loader-background">
            <div class="spinner">
                <div class="dot1">
                </div>
                <div class="dot2">
                </div>
            </div>
        </div>
        <script type="text/javascript" language="JavaScript">
            document.onreadystatechange = function() {
                if (document.readyState == "complete") {
                    $("#pre-loader").fadeOut("slow");
                    document.getElementById("pre-loader").remove();
                }
            }
        </script>
        <div class="wrapper">
            <header>
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-header header-logo">
                            <a href="/">蓝搜搜</a>
                        </div>
                        <div class="menu navbar-right">
                            <input id="switch_default" type="checkbox" class="switch_default">
                            <label for="switch_default" class="toggleBtn"></label>
                        </div>
                    </div>
                </nav>
                <nav class="navbar-mobile" id="nav-mobile">
                    <div class="container">
                        <div class="navbar-header">
                            <div>
                                <a href="/">蓝搜搜</a>
                                <a id="mobile-toggle-theme"></a>
                            </div>
                            <a class="menu-toggle" href="/"><font size='4px'>&#8962;</font> 首页</a>
                        </div>
                    </div>
                </nav>
            </header>
            <div class="main">
                <div class="container">
                    <div class="intro">
                        <div class="row clearfix">
                            <div class="col-lg-12 searchbox">
                                <?php foreach ($results as $tmp) { ?>
                                    <ul class="breadcrumb" style="margin-bottom:10px;display:block;background-color: #f5f5f5;padding: 10px 15px;border-radius:5px;">
                                        <li class="active" style="font-size:15px;display:block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">[<?php echo $tmp['dates']?>] <a style="color:#666;text-decoration:none;" href="<?php echo $tmp['link']?>" target="_blank"><?php echo $tmp['title']?></a> </li>
                                    </ul>
                                <?php } ?>
                                <?php if ($total_results == 0) { ?>
                                    <h3 style="margin-top:50px;"><center>没有找到相关结果</center></h3>
                                <?php } ?>
                                <?php if ($total_pages > 1) { ?>
                                    <div class="pagination">
                                        <?php if ($page > 1) { ?>
                                            <a href="?wd=<?php echo $wd ?>&page=<?php echo $page - 1 ?>">上一页</a>
                                        <?php } ?>
                                        <?php for ($i = 1; $i <= $total_pages; $i++) { ?>
                                            <?php if ($i == $page) { ?>
                                                <span class="current"><?php echo $i ?></span>
                                            <?php } else { ?>
                                                <a href="?wd=<?php echo $wd ?>&page=<?php echo $i ?>"><?php echo $i ?></a>
                                            <?php } ?>
                                        <?php } ?>
                                        <?php if ($page < $total_pages) { ?>
                                            <a href="?wd=<?php echo $wd ?>&page=<?php echo $page + 1 ?>">下一页</a>
                                        <?php } ?>
                                    </div>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                #background {
                    z-index: -1;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            </style>
            <canvas id="background"></canvas>
            <footer id="footer" class="footer">
                <div class="copyright">
                    <span>© 2018-2023 | <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">渝ICP备2021004907号-2</a>
                    </span>
                </div>
            </footer>
            <script>
			try {
				if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				} else {
						var canvas = document.querySelector('canvas'),
							ctx = canvas.getContext('2d')
							canvas.width = window.innerWidth;
						canvas.height = window.innerHeight;
						ctx.lineWidth = .3;
						ctx.strokeStyle = (new Color(150)).style;
						var mousePosition = {
							x: 30 * canvas.width / 100,
							y: 30 * canvas.height / 100
						};
						var dots = {
							nb: 250,
							distance: 100,
							d_radius: 150,
							array: []
						};
						function colorValue(min) {
							return Math.floor(Math.random() * 255 + min);
						}
						function createColorStyle(r, g, b) {
							return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
						}
						function mixComponents(comp1, weight1, comp2, weight2) {
							return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
						}
						function averageColorStyles(dot1, dot2) {
							var color1 = dot1.color,
								color2 = dot2.color;
							var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
								g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
								b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
							return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
						}
						function Color(min) {
							min = min || 0;
							this.r = colorValue(min);
							this.g = colorValue(min);
							this.b = colorValue(min);
							this.style = createColorStyle(this.r, this.g, this.b);
						}
						function Dot() {
							this.x = Math.random() * canvas.width;
							this.y = Math.random() * canvas.height;
							this.vx = -.5 + Math.random();
							this.vy = -.5 + Math.random();
							this.radius = Math.random() * 2;
							this.color = new Color();
						}
						Dot.prototype = {
							draw: function() {
								ctx.beginPath();
								ctx.fillStyle = this.color.style;
								ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
								ctx.fill();
							}
						};
						function createDots() {
							for (i = 0; i < dots.nb; i++) {
								dots.array.push(new Dot());
							}
						}
						function moveDots() {
							for (i = 0; i < dots.nb; i++) {
								var dot = dots.array[i];
								if (dot.y < 0 || dot.y > canvas.height) {
									dot.vx = dot.vx;
									dot.vy = -dot.vy;
								} else if (dot.x < 0 || dot.x > canvas.width) {
									dot.vx = -dot.vx;
									dot.vy = dot.vy;
								}
								dot.x += dot.vx;
								dot.y += dot.vy;
							}
						}
						function connectDots() {
							for (i = 0; i < dots.nb; i++) {
								for (j = 0; j < dots.nb; j++) {
									i_dot = dots.array[i];
									j_dot = dots.array[j];
									if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
										if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
											ctx.beginPath();
											ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
											ctx.moveTo(i_dot.x, i_dot.y);
											ctx.lineTo(j_dot.x, j_dot.y);
											ctx.stroke();
											ctx.closePath();
										}
									}
								}
							}
						}
						function drawDots() {
							for (i = 0; i < dots.nb; i++) {
								var dot = dots.array[i];
								dot.draw();
							}
						}
						function animateDots() {
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							moveDots();
							drawDots();
							requestAnimationFrame(animateDots);
						}
						createDots();
						requestAnimationFrame(animateDots);
				}
			} catch (e) {}
		</script>
        </div>
    </body>
</html>
