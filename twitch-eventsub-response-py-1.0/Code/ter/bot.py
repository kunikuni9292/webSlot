# Import
# -----------------------------------------------------------------------------
from __future__ import annotations
from typing import Any
# Import文の下に以下のコードを追加
import random
import webbrowser
import time

#
from twitchio import Channel, Chatter, PartialUser
from twitchio.ext import commands
#
from .cogs import *
# -----------------------------------------------------------------------------

#main.pyでPythonをビルドするとコメントの取得機能が起動する

# Classes
# -----------------------------------------------------------------------------
# ----------------------------------------------------------------------
class TERBot(commands.Bot):
    last_comment_time = 0

    def __init__(self, _j: dict[str, Any], ) -> None:
        print(f'  Initializing bot ...')
        self.__j: dict[str, Any] = _j
        self.__token: str = str(self.__j['bot']['oAuthAccessToken'])
        self._mokiti = 'モキチ'
        self.__pu: PartialUser | None = None
        self.__return_code: int = -1
        #
        broadcaster_user_name: str = str(
            self.__j['messageChannel']['broadcasterUserName']
        )
        print(f"    Message channel user name = {broadcaster_user_name}")
        print(f'    Bot token length = {len(self.__token)}')
        super().__init__(  # type: ignore
            self.__token,
            prefix=self._mokiti,
            initial_channels=[
                broadcaster_user_name,
            ],
        )
        print(f'  done.')
        print(f'')

    @property
    def return_code(self) -> int:
        return self.__return_code

    async def event_channel_joined(self, channel: Channel):
        print(f'  Joining channel ...')
        print(f'    Channel name = {channel.name}')
        print(f'  done.')
        print(f'')

    async def event_ready(self) -> None:
        print(f'  Making bot ready ...')
        assert self.user_id is not None, f'Bot user ID is unknown.'
        assert self.nick is not None, f'Bot user name is unknown.'
        self.__pu = self.create_user(self.user_id, self.nick)
        print(f'    Bot user ID = {self.__pu.id}')
        print(f'    Bot user name = {self.__pu.name}')
        #
        print(f'    Bot commands')
        for c_name in self.commands.keys():
            print(f'      {self._mokiti}{str(c_name)}')
        #
        print(f'    Bot cogs')
        self.add_cog(
            TERRaidCog(
                self, self.__token, self.__pu, self.__j['responses']['/raid'],
            )
        )
        # ToDo: ★ 別のCogを開発した場合は、登録処理をここに実装する
        # self.add_cog(
        #     TER????Cog(
        #
        #     )
        # )
        #
        for c in self.cogs.keys():
            print(f'      {c}')
        #
        name_color: str = str(self.__j['bot']['nameColor'])
        if name_color != 'DoNotChange':
            print(f'    Setting bot name color = {name_color} ... ', end='', )
            #
            await self.update_chatter_color(
                self.__token, self.user_id, name_color
            )
            print(f'done.')
        print(f'  done.')
        print(f'')
        #
        assert len(self.connected_channels) == 1, (
            f'Bot is joining {self.connected_channels}.'
        )
        #
        await self.connected_channels[0].send(
            f'モキチはコメント取得の準備ができたぞっ！！！'
        )

    # メッセージイベント取得
    async def event_message(self, message):

        # メッセージの内容を取得
        content = message.content.lower()

        # 特定の文字列に対してコメントを返す
        if "ハロー" in content:
            responses = ["ヤッホー!"]
            response = random.choice(responses)
            await message.channel.send(response)


        # メッセージにコメントが含まれている場合、指定のURLをブラウザで開く
        if "スタート" in content:    
            # 現在時刻を取得
            current_time = time.time()

            # 30秒以内にコメントが送信された場合
            if current_time - self.last_comment_time <= 30:
                remaining_time = int(30 - (current_time - self.last_comment_time))
                await message.channel.send(f"少々お待ちください。残り{remaining_time}秒")
            else:
                self.last_comment_time = current_time  # 最後にコメントが送信された時刻を更新
                url = "https://d3cpdkss57u1wx.cloudfront.net" #URLからindexを削除してみた動作確認する

                # url = "http://blurbuckets.s3-website-ap-northeast-1.amazonaws.com"
                webbrowser.open(url, 0)  # 同じタブ内で再度読み込みする
    
        await self.handle_commands(message)

    @commands.command(name='test', )
    async def __test(self, ctx: commands.Context):
        print(f"  Testing bot (v{self.__j['ver_no']}) ...")
        print(f'    Channel name = {ctx.channel.name}')
        assert self.__pu is not None, f'Bot user is not created.'
        print(f'    Bot user ID = {self.__pu.id}')
        print(f'    Bot user name = {self.__pu.name}')
        print(f'    Bot commands')
        for c_name in self.commands.keys():
            print(f'      {self._mokiti}{str(c_name)}')
        #
        print(f'    Bot cogs')
        for c_name in self.cogs.keys():
            print(f'      {c_name}')
        #
        await ctx.send(f'{self._mokiti} は健在！！！')
        print(f'  done.')
        print(f'')

    @commands.command(name='restart', )
    async def __restart(self, ctx: commands.Context):
        ctx.message.content = f'{self._prefix}kill 3'
        #
        await self.__kill(ctx)

    @commands.command(name='kill', )
    async def __kill(self, ctx: commands.Context):
        if self.__is_by_channel_broadcaster_or_myself(ctx) is True:
            print(f'  Killing bot ... ')
            self.loop.stop()
            #
            await ctx.send(f'{self._mokiti}のコメントが止まった！！')
            #
            is_valid_return_code: bool = False
            return_code_str: str = str(
                ctx.message.content
            ).strip().removeprefix(f'{self._mokiti}kill').strip()
            if len(return_code_str) <= 3 and return_code_str.isdecimal() is True:
                return_code_int: int = int(return_code_str)
                if 0 <= return_code_int <= 255:
                    self.__return_code = int(return_code_int)
                    is_valid_return_code = True
                else:
                    self.__return_code = 0
                    is_valid_return_code = False
            else:
                self.__return_code = 0
                is_valid_return_code = (
                    True if len(return_code_str) == 0 else False
                )
            print(f'    Return code = {self.__return_code}')
            if is_valid_return_code is False:
                print(f'      * Invalid return code input')
            print(f'  done.')
            print(f'')

    def __is_by_channel_broadcaster_or_myself(self,
        ctx: commands.Context,
    ) -> bool:
        if type(ctx.author) is Chatter:
            if ctx.author.is_broadcaster is True:
                return True
            elif ctx.author.id == str(self.user_id):
                return True
            else:
                return False
        else:
            return False
# ----------------------------------------------------------------------
# -----------------------------------------------------------------------------
