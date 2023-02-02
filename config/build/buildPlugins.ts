import { BuildOptions } from 'config/build/types/config';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export function buildPlugins({
  paths,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
  ];
}
