import { Component } from '@angular/core';

@Component({
  selector: 'multisolver-header',
  template: `   <header id="headerArea">
                    <a href="#" class="scrollToTop"><i class="fa fa-angle-up"></i></a>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">					 
                            <div class="menuarea"> 
                                <div class="navbar navbar-default navbar-fixed-top past-main" role="navigation">
                                    <div id="navbar-container" class="container">
                                        <div class="navbar-header">
                                            <button type="button"
                                                class="navbar-toggle"
                                                data-toggle="collapse"
                                                data-target=".navbar-collapse">
                                                <span class="sr-only">Toggle navigation</span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                            </button>
                                            <!-- For Text Logo -->
                                            <a class="text-nowrap navbar-brand logo" href="#">
                                                <span>
                                                    <i class="fa fa-cogs" aria-hidden="true"></i>
                                                </span>
                                                <span>Multi</span>Solver
                                            </a>
                                        </div>
                                        <div id="navbar-links" class="navbar-collapse collapse">
                                            <ul class="nav navbar-nav navbar-right custom_nav mobnav" id="top-menu">
                                            <li class="active"><a href="#crypto">CRYPTO</a></li>
                                            <li><a href="#URL_2">URL_2</a></li>
                                            <li><a href="#URL_3">URL_3</a></li>
                                            <li><a href="#URL_4">URL_4</a></li>
                                            <li><a href="#URL_5">URL_5</a></li>
                                            <li><a href="#URL_6">URL_6</a></li>
                                            <li><a href="#URL_7">URL_7</a></li>
                                            </ul>
                                        </div><!--/.nav-collapse -->
                                    </div>
                                </div>
                            </div>
                        </div>	
                    </div>			
                </header>`
})
export class HeaderComponent { }