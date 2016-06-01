import curses
from random import choice,randrange
from collections import defaultdict

action=["Up","Down","Left","Right",'Restart','Exit']
inputs=[ord(i) for i in "WSADRQwsadrq"]
action_dict=dict(zip(inputs,action*2))

def get_user_input(keyboard):
    input_word="N"
    while input_word not in action_dict:
        input_word = keyboard.getch()
    return action_dict[input_word]

def transport(field):
    return [list(row) for row in zip(*field)]

def invert(field):
    #invert the field
    return [row[::-1] for row in field]

class GameField:
    def __init__(self, height=4,width=4,win=2048):
        self.height=height
        self.width=width
        self.win_value=win
        self.score=0
        self.hightscore=0
        self.reset()

    def reset(self):
        if self.score > self.hightscore:
            self.hightscore=self.score
        self.score=0
        self.field=[[0 for i in range(self.width)] for j in range(self.height)]
        self.spawn()
        self.spawn()

    def spawn(self):
        new_element=4 if randrange(100)>89 else 2
        (i,j)=choice([(i,j) for i in range(self.width) for j in range(self.height) if self.field[i][j]==0])
        self.field[i][j]=new_element

    def move(self,direction):
        def move_row_left(row):
            #leftmove action
            def tighten(row):
                new_array=[ e for e in row if e!=0]
                new_array+=[0 for i in range(len(row)-len(new_array))]
                return new_array

            def merge(row):
                pair=False
                new_row=[]
                for i in range(len(row)):
                    if pair:
                        new_row.append(row[i]*2)
                        self.score+=row[i]*2
                        pair=False
                    else:
                        if i+1<len(row) and row[i]==row[i+1]:
                            pair=True
                            new_row.append(0)
                        else:
                            new_row.append(row[i])
                assert len(new_row)==len(row)
                return new_row
            return tighten(merge(tighten(row)))

        moves = {}
        moves['Left']=lambda field: [move_row_left(row) for row in field]
        moves['Right']=lambda field: invert(moves['Left'](invert(field)))
        moves['Up']=lambda field: transport(moves['Left'](transport(field)))
        moves['Down']=lambda field: transport(moves['Right'](transport(field)))

        if direction in moves:
            if self.move_is_possible(direction):
                self.field=moves[direction](self.field)
                self.spawn()
                return True
            else:
                return False

    def is_win(self):
       return any(any(i>self.win_value for i in row)for row in self.field)

    def is_gameover(self):
            return not any(self.move_is_possible(move) for move in action)

    def draw(self,screen):
        help_string1='(W)Up (S)Down (A)Left (D)Right'
        help_string2='      (R)Restart (Q)Exit'
        gameover_string='   Game Over'
        win_string='    You Win!'

        def cast(string):
            screen.addstr(string+'\n')

        def draw_hor_separator():
            line='+'+('+------' * self.width + '+')[1:]
            separator = defaultdict(lambda:line)
            if not hasattr(draw_hor_separator, 'counter'):
                draw_hor_separator.counter=0
            cast(separator[draw_hor_separator.counter])
            draw_hor_separator.counter+=1

        def draw_row(row):
            cast(''.join('|{:^5} '.format(num) if num>0 else '|      'for num in row)+'|')

        screen.clear()
        cast('SCORE: '+str(self.score))

        if 0!=self.hightscore:
            cast('HIGHSCORE: '+str(self.hightscore))

        for row in self.field:
            draw_hor_separator()
            draw_row(row)

        draw_hor_separator()
        if self.is_win():
            cast(win_string)
        else:
            if self.is_gameover():
                cast(gameover_string)
            else:
                cast(help_string1)
        cast(help_string2)

    def move_is_possible(self, direction):
        def row_is_left_movable(row):
            def change(i):
                if row[i]==0 and row[i+1]!=0:
                    return True
                if row[i]!=0 and row[i]==row[i+1]:
                    return True
                return False
            return any(change(i) for i in range(len(row)-1))

        check={}
        check['Left']=lambda field:any(row_is_left_movable(row) for row in field)
        check['Right']=lambda field:check['Left'](invert(field))
        check['Up']=lambda field:check['Left'](transport(field))
        check['Down']=lambda field:check['Right'](transport(field))

        if direction in check:
            return check[direction](self.field)
        else:
            return False

def main(stdscr):
    def init():
        #init the screen
        game_field.reset()
        return "Game"

    def not_game(state):
        game_field.draw(stdscr)
        action = get_user_input(stdscr)
        responses = defaultdict(lambda:state)
        responses["Restart"], responses["Exit"]="Init","Exit"
        return responses[action]

    def game():
        game_field.draw(stdscr)
        action = get_user_input(stdscr)
        if action=="Restart":
            return "Init"
        if action=="Exit":
            return "Exit"
        if game_field.move(action):
            if game_field.is_win():
                return "Win"
            if game_field.is_gameover():
                # fail the game
                return "Gameover"
        return "Game"

    state_actions={
        "Init":init,
        "Win": lambda: not_game("Win"),
        "Gameover":lambda: not_game("Gameover"),
        "Game":game
    }
    curses.use_default_colors()
    game_field=GameField(win=32)
    state="Init"
    while state!="Exit":
        state=state_actions[state]()

curses.wrapper(main)
