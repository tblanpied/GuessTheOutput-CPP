#include <iostream>

int main() {
    const char* s = "ab";
    char* p = const_cast<char*>(s);
    p[0] = 'x';
    std::cout << s << "\n";
}
