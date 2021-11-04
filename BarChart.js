/*
 * Copyright (c) 2021 Joakim Skogø Langvand
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class BarChart {
    constructor(canvas, x, width, y, height, min, max) {
        canvas.style.background = '#eaeaea';
        this.ctx = canvas.getContext('2d');
        this.ctx.font = '10px arial';
        this.ctx.fillStyle = 'black';
        this.posX = x;
        this.posY = y;
        this.height = height;
        this.width = width;
        this.min = min;
        this.max = max;
    }

    #coordX(x) {
        return this.posX + x * this.width;
    }

    #coordY(y) {
        return this.posY + (this.height - y * this.height);
    }

    #coordYFromValue(val) {
        return this.#coordY(val / this.max);
    }

    drawGrid(n = 10) {
        this.ctx.beginPath();
        for (let i = 1; i <= n; ++i) {
            this.ctx.moveTo(this.#coordX(0), this.#coordY(i / n));
            this.ctx.lineTo(this.#coordX(1), this.#coordY(i / n));
            this.ctx.fillText((this.max * i / n).toString(),
                this.#coordX(0) + 5, this.#coordY(i / n) - 5);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawBar(x, val, colour = 'black', label = '', width = 40) {
        x = this.#coordX(x);
        const fillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, this.#coordYFromValue(val), width, this.#coordY(0) - this.#coordYFromValue(val));
        this.ctx.fillStyle = fillStyle;
        this.ctx.fillText(label, x, this.#coordY(0) + 15);
    }

    #drawRect(x, y, w, h, colour = 'black') {
        const fillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.fillStyle = fillStyle;
    }

    drawLegend(x, y, keys, w = 100) {
        for (let i = 0; i < keys.length; ++i) {
            const posY = y + i * 20 - 5 * (i > 0);
            this.#drawRect(x, posY, w, 20, 'white');
            this.#drawRect(x + 5, posY + 5, 20, 10, keys[i].colour);
            this.ctx.fillText(keys[i].label, x + 30, posY + 15);
        }
    }
}