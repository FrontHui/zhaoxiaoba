一、测试题目一
package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
    "regexp"
    "strconv"
    "time"
)

func main() {
    startTime := time.Now()
    numPages := 100
    numItemsPerPage := 5
    pattern := `"email":\s*"\s*([^"]+)`
    emails := []string{}
    // 需要爬取的网页共有100
    for pageNum := 1; pageNum <= numPages; pageNum++ {
        url := fmt.Sprintf("https://jsonplaceholder.typicode.com/posts/%d/comments", pageNum)
        resp, err := http.Get(url)
        if err != nil {
            panic(err)
        }
        defer resp.Body.Close()

        body, err := ioutil.ReadAll(resp.Body)
        if err != nil {
            panic(err)
        }
        // 切片处理
        re := regexp.MustCompile(pattern)
        matches := re.FindAllSubmatch(body, -1)

        for _, match := range matches {
            email := string(match[1])
            emails = append(emails, email)
        }

        if pageNum%10 == 0 {
            fmt.Printf("Processed %d pages...\n", pageNum)
        }
    }
    // 把emails 写入 emails.txt 中
    filename := "emails.txt"
    data := []byte("Emails:\n\n" + formatEmails(emails))
    err := ioutil.WriteFile(filename, data, 0644)
    if err != nil {
        panic(err)
    }

    fmt.Printf("Finished in %d seconds. %d emails saved to %s\n", int(time.Since(startTime).Seconds()), len(emails), filename)
}

func formatEmails(emails []string) string {
    formattedEmails := ""
    for i, email := range emails {
        formattedEmails += fmt.Sprintf("%d. %s\n", i+1, email)
    }
    return formattedEmails
}

二、测试题目2

from tools.mysqlTools import addressbook_pb2 as ad_pb2
# 新增Person,phones
person = ad_pb2.Person()
person.name = 'liling'
person.id = 123
person.email = 'liling@example.com'

phone1 = person.phones.add()
phone1.number = '0987654321'
phone1.type = ad_pb2.Person.PhoneType.MOBILE

phone2 = person.phones.add()
phone2.number = '022222222'
phone2.type = ad_pb2.Person.PhoneType.WORK

# 新增到 AddressBook
address_book = ad_pb2.AddressBook()
address_book.people.append(person)

# 将AddressBook 写入到 binary
with open('addressbook.bin', 'wb') as f:
    f.write(address_book.SerializeToString())

# 从binary 中读取 AddressBook
with open('addressbook.bin', 'rb') as f:
    address_book2 = ad_pb2.AddressBook()
    address_book2.ParseFromString(f.read())

    # 读取 Person 资料
    person2 = address_book2.people[-1::]
    print('Name:', person2.name)
    print('ID:', person2.id)
    print('Email:', person2.email)
    for phone in person2.phones:
        print('Phone:', phone.number)
        print('Phone Type:', phone.type)
