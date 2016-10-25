import { Component } from '@angular/core';

@Component({
  selector: 'multisolver-footer',
  template: `<footer id="footer">
                <div class="container">
                    <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="footer_area">
                            <p redfont>Made by <span redfont class="green-text">dennistreysa</span></p>
                            <p>
                                <i class="devicon-html5-plain-wordmark colored"></i>
                                <i class="devicon-css3-plain-wordmark colored"></i>
                                <i class="devicon-angularjs-plain colored"></i>
                                <i class="devicon-javascript-plain colored"></i>
                                <i class="devicon-bitbucket-plain-wordmark colored"></i>
                                <i class="devicon-bootstrap-plain-wordmark colored"></i>
                                <i class="devicon-nginx-original colored"></i>

                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </footer>`
})
export class FooterComponent { }