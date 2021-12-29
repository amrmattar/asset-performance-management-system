function change(inp) {
    debugger;
    can.width = inp.value;
    can.height = inp.value/4;
    draw(can, [5,10,15,20])
  }
  
  function draw(canvas,value) {
    let ctx = can.getContext('2d');
    let wid_bar = canvas.width - 400;
    value.forEach((val, idx) => {
        // draw bar background
        ctx.save();
        ctx.beginPath();
        ctx.rect(200, idx * 80, wid_bar, 30);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    });
  }
  
