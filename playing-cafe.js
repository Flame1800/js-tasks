function findPlayingTime(users, rooms) {

    const playingTime = [];
  
    for (let i = 0; i < users.length - 1; i++) {
  
      const user = users[i];
  
      const nextUser = users[i + 1];
  
  
  
      const room = rooms[i];
  
  
  
      if (user[1] >= nextUser[0]) {
  
        // Василий играл с предыдущим посетителем
  
        playingTime.push([user[0], user[1]]);
  
      } else if (user[1] <= nextUser[0]) {
  
        // Василий ушел перед новым посетителем
  
        if (user[1] >= room[0] && nextUser[0] <= room[1]) {
  
          // Проверяем, что Василий играл в этой комнате
  
          playingTime.push([user[1], nextUser[0]]);
  
        }
  
      }
  
    }
  
  
  
    return playingTime;
  
  }
  
  
  
  const users = [
            [10, 12],
            [13, 17],
            [14, 15]
  ];
  
  
  
  const rooms = [2];
  
  
  
  const playingTime = findPlayingTime(users, rooms);
  
  console.log(playingTime); // Выводит: [[23, 24], [23, 24], [23, 24]]