loadShaderpack({
	name: "Fat Critter",
	shader: `#version 300 es
		precision mediump float;
		#define STRENGTH 2.
		#define WIDTH 1.8
		#define ZOOM 1.3
		uniform sampler2D uStageTex;
		uniform vec2 uViewportSize;
		uniform float uViewportScale;
		uniform vec2 uPlayerPos;
		in vec2 vStageCoord;
		out vec4 fColor;

		vec2 distort(vec2 c, float a) {
			float theta = atan(c.y, c.x);
			float radius = length(c);
			radius = pow(radius, a);
			return radius * vec2(cos(theta),sin(theta));
		}
		void main() {
			float aspect = uViewportSize.x / uViewportSize.y / WIDTH;
			vec2 p = uPlayerPos * uViewportScale / uViewportSize;
			vec2 c = vStageCoord - p;
			c.x *= aspect;
			c = distort(c, STRENGTH);
			c.x /= aspect;
			fColor = texture(uStageTex, c * ZOOM + p);
		}`,
	container: world.stage.room,
	uniforms: {
		uPlayerPos: ['vec2', _ => {
			let p = world.stage.room.getPlayer(world.player.playerId);
			return [p.x, p.y - 10 * p.scale];
		}],
	},
})