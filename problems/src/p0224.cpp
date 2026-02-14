#include <iostream>
#include <string>

int main() {
    std::string s = "ab";
    s.push_back('\0');
    s.push_back('c');

    std::cout << s.size() << ' ' << s.c_str() << ' ' << s[3] << "\n";
}
