function parseCouple($, coupleElement, couple) {
  const uri = $(coupleElement)
    .children('.group_content')
    .children('span')
    .children('a')
    .attr('href');
  const subject = $(coupleElement)
    .children('.group_content')
    .html()
    .split('<br>')[0];
  const teacher = $(coupleElement)
    .children('.group_content')
    .html()
    .split('<br>')[1];
  const type = $(coupleElement)
    .children('.group_content')
    .html()
    .split('<br>')[2]
    .replace(/&nbsp;/g, '');
  return {
    uri,
    type,
    teacher: teacher.substring(0, teacher.length - 3),
    subject,
    couple,
  };
}

module.exports = {
  parseCouple,
};
